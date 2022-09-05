const { Router } = require("express");
const subscriptionRouter = Router();
const { addMonths, getMonth, addDays, format } = require("date-fns");

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

subscriptionRouter.post("/checkout", (req, res) => {
  res.render("subscription/checkout");
});

// To do: Render order confirmation page.
//// If order fails, render an error message on top.
//// If order succeeds, create an order, and redirect to account order history.

subscriptionRouter.post("/confirmation", isLoggedIn, (req, res) => {
  userId = req.session.userId;
  const { duration, productType } = req.body;

  let revisedDuration;
  if (productType == "Anniversary forfait") {
    revisedDuration = duration * 13;
  } else if (productType == "Experience forfait") {
    revisedDuration = duration * 3;
  } else {
    revisedDuration = duration;
  }

  //// Use date-fns
  const fromDate = format(new Date(), "yyyy-MM-dd");
  const toDate = format(addMonths(new Date(), duration), "yyyy-MM-dd");

  //// Hard-coded data to test on creating an order
  // let fromDate = new Date("2021-01-10").toISOString().split("T")[0];
  // let toDate = new Date("2021-12-10").toISOString().split("T")[0];
  // const duration = 3;

  // Create an order
  SubscriptionModel.create({
    productType: productType,
    duration: revisedDuration,
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
