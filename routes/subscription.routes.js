const { Router } = require("express");
const subscriptionRouter = Router();

// Routes
subscriptionRouter.get("/presentation", (req, res) => {
  session = req.session;
  res.render("subscription/presentation", { session });
});

module.exports = subscriptionRouter;
