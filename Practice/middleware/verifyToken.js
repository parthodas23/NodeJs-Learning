// import jwt from "jsonwebtoken";

// const verifyToken = async (req, res, next) => {
//   const authHeader = req.headers.token;
//   if (!authHeader) {
//     res.status(500).json("You're not authenticated.");
//   }
//   try {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//       req.user = user;
//       next();
//     });
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// const verifyTokenAndAuthorization = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You're not allowed to do that.");
//     }
//   });
// };
// const verifyTokenAndAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You're not allowed to do that.");
//     }
//   });
// };

// export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };

import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.token;

    if (authHeader) {
      let token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) return res.status(403).json("You token isn't valid.");

        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You're not authenticated.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("You're not authenticated");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status("You're not authenticated.");
    }
  });
};

export { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization };
