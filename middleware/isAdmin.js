module.exports = (req, res, next) => {
  // checks if the role of logged in person is admin
  if (req.session.user.role !== "admin") {
    return res.redirect("/");
  }
  next();
};
