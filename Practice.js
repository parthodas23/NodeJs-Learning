import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

const users = [
  { id: 1, username: "annie", password: "annie321", isAdmin: true },
  { id: 2, username: "laboni", password: "laboni321", isAdmin: true },
];

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, "secret_key_321", {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, "secret_key_321");
};

let refreshTokens = [];
app.post("/api/refresh", (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    res.status(403).json("You're not authenticated.");
  }

  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json("Your token isn't valid.");
    
  }

  jwt.verify(refreshToken, "secret_key_321", (err, user) => {
    err && console.log(err);

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.status(200).json({
      newAccessToken: newAccessToken,
      newRefreshToken: newRefreshToken,
    });
  });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    res.status(403).json("You're not authenticated.");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  refreshTokens.push(refreshToken);

  res.status(200).json({
    username: user.username,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization.split(" ")[1];
  if (!authHeader) {
    res.status(401).json("Please provide the authorization token in Header");
  }

  jwt.verify(authHeader, "secret_key_321", (err, user) => {
    if (err) {
      res.status(403).json("You're not authenticated.");
    }

    req.user = user;
    next();
  });
};

app.delete("/api/users/:userId", verify, (req, res) => {
  if (req.user.id !== parseFloat(req.params.userId)) {
    res.status("Wrong credentials: please provide the right userId");
  } else {
    res.status(200).json("User has been deleted.");
  }
});

app.post("/api/logout", verify, (req, res) => {
  const refreshToken = req.body.token;

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

  res.status(200).json("You're logged out.");
});

app.listen(5000, () => {
  console.log("Backend Running on 5000");
});
