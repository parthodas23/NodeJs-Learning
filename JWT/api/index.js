import express from "express";
import jwt from "jsonwebtoken";
const app = express();

app.use(express.json());

const users = [
  {
    id: 1,
    username: "Partha das",
    password: "partha123",
    isAdmin: true,
  },
  {
    id: 2,
    username: "Pritha das",
    password: "pritha123",
    isAdmin: false,
  },
];

let refreshTokens = [];

app.post("/api/refresh", (req, res) => {
  let refreshToken = req.body.token;

  if (!refreshToken) {
    res.status(401).json("You're not authenticated.");
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
      NewAccessToken: newAccessToken,
      NewRefreshToken: newRefreshToken,
    });
  });

  re;
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_key_321", (err, user) => {
      if (err) {
        res.status(403).json("Your token is't valid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated.");
  }
};

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, "secret_key_321", {
    expiresIn: "15m",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, "secret_key_321");
};

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    res.status(403).json("User data isn't correct");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  refreshTokens.push(refreshToken);
  res.status(200).json({
    Username: user.username,
    isAdmin: user.isAdmin,
    AccessToken: accessToken,
    RefreshToken: refreshToken,
  });
});

app.delete("/api/users/:userId", verify, (req, res) => {
  if (req.user.id === parseInt(req.params.userId)) {
    res.status(200).json("User has been deleted");
  } else {
    res.status(403).json("You're not allowed to delete this user.");
  }
});

app.post("/api/logout", verify, (req, res) => {
  const refreshToken = req.body.token;

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

  return res.status(200).json("You successfully logged out.");
});

app.listen(5000, () => {
  console.log("Backend server is running");
});
