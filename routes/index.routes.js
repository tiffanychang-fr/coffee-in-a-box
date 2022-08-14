const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  const session = req.session;
  console.log(session.userId);
  res.render("index", { session });
});

module.exports = router;
