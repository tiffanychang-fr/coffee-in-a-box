const { Router } = require("express");
const subscriptionRouter = Router();

const SubscriptionModel = require("../models/Subscription.model");

const isLoggedIn = require("../middleware/isLoggedIn");

// Routes
subscriptionRouter.get("/presentation", (req, res) => {
  session = req.session;
  res.render("subscription/presentation", { session });
});

// Render checkout page
subscriptionRouter.get("/checkout", (req, res) => {
  res.render("subscription/checkout");
});

// To do: Render order confirmation page.
//// If order fails, render an error message on top.
//// If order succeeds, create an order, and redirect to account order history.

subscriptionRouter.get("/confirmation", isLoggedIn, (req, res) => {
  userId = req.session.userId;
  // Create an order
  //// Hard-coded data to test on creating an order
  let fromDate = new Date("2021-01-10").toISOString().split("T")[0];
  let toDate = new Date("2021-12-10").toISOString().split("T")[0];
  SubscriptionModel.create({
    productType: "Monthly subscription 11.90 €",
    duration: 3,
    startDate: fromDate,
    endDate: toDate,
    userId,
  })
    .then((createdOrder) => {
      // If order is created successfully, redirect to account order history
      res.redirect("/account/subscription");
    })
    .catch((error) => {
      return res.status(400).render("subscription/checkout", {
        errorMessage:
          "There is an error happened while creating the order. Please checkout again.",
      });
    });
});

module.exports = subscriptionRouter;
