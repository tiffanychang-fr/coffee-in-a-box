const { Router } = require("express");
const subscriptionRouter = Router();

// Routes
subscriptionRouter.get("/presentation", (req, res) => {
  session = req.session;
  res.render("subscription/presentation", { session });
});

// Render checkout page
subscriptionRouter.get("/checkout/recap", (req, res) => {
  res.render("subscription/recap");
});

module.exports = subscriptionRouter;
