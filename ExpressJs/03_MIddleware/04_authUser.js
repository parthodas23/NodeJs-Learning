const authUser = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token === "secretPartha") {
    console.log("User Authorized.");
    next();
  } else {
    res.status(401).json({ error: "Unauthorized Access" });
  }
};
module.exports = authUser;
