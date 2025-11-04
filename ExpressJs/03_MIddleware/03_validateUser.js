const validateUser = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).send("Name and Email address needed.");
  }
  next();
};

module.exports = validateUser;
