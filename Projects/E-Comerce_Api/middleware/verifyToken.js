import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return res.status(401).json("Your token isn't valid.");

      req.user = user;
      next();
    });
  } else {
    return res.status(403).json("You're not authenticated.");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user.id);
    console.log(req.user.isAdmin);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json("You're not allowed to do that.");
    }
  });
};

export { verifyToken, verifyTokenAndAuthorization };
