const { isValidObjectId } = require("mongoose");
const { Router } = require("express");
const accountRouter = Router();
const {
  Types: { ObjectId },
} = require("mongoose");

const UserModel = require("../models/User.model");

// Fake Order Data
let fromDate = new Date("2021-09-10").toISOString().split("T")[0];
let toDate = new Date("2022-12-10").toISOString().split("T")[0];
let fromDate2 = new Date("2022-01-10").toISOString().split("T")[0];
let toDate2 = new Date("2022-06-10").toISOString().split("T")[0];
let fromDate3 = new Date("2022-07-10").toISOString().split("T")[0];
let toDate3 = new Date("2022-10-10").toISOString().split("T")[0];

const fakeOrderData = [
  { duration: 3, startDate: fromDate, endDate: toDate },
  { duration: 6, startDate: fromDate2, endDate: toDate2 },
  { duration: 3, startDate: fromDate3, endDate: toDate3 },
];

// Routes

// Logged In View
accountRouter.get("/dashboard", (req, res) => {
  session = req.session;
  userId = req.session.userId;
  console.log(req.session);

  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.redirect("/");
      }

      res.render("account/dashboard", { session, user });
    })
    .catch((err) => {
      console.log("err:", err);
      res.status(500).redirect("/");
    });
});

// User Account Information
accountRouter.get("/information", (req, res) => {
  session = req.session;
  userId = req.session.userId;
  // console.log(req.session);

  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.redirect("/");
      }

      res.render("account/information", { session, user });
    })
    .catch((err) => {
      console.log("err:", err);
      res.status(500).redirect("/");
    });
});

// Change user infos
accountRouter.get("/edit-details", async (req, res) => {
  session = req.session;
  userId = req.session.userId;

  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.redirect("/");
      }

      res.render("account/edit-details", { session, user });
    })
    .catch((err) => {
      console.log("err:", err);
      res.status(500).redirect("/");
    });
});

accountRouter.post("/edit-details", async (req, res) => {
  const { username = "", email = "" } = req.body;
  userId = req.session.userId;

  if (username.length < 4) {
    return res.status(400).render("settings/update-user", {
      usernameError: "Please choose something with more than 4 characters",
      ...req.body,
    });
  }

  if (!email.includes("@")) {
    // @email andre@ || @
    return res.status(400).render("settings/update-user", {
      emailError:
        "Please add, at the very least an @ symbol. We dont ask for THAT much",
      ...req.body,
    });
  }

  const aSingleUser = await UserModel.findOne({
    $or: [{ username }, { email }],
    _id: { $ne: ObjectId(userId) },
  });

  if (!aSingleUser) {
    await UserModel.findByIdAndUpdate(userId, { username, email });
    return res.redirect("/account/information");
  }

  UserModel.find({
    _id: {
      $nin: [ObjectId(userId)],
      $or: [{ username }, { email }],
    },
  });
});

accountRouter.get("/subscription", (req, res) => {
  session = req.session;
  userId = req.session.userId;
  // console.log(req.session);

  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.redirect("/");
      }
      res.render("account/order-history", { session, user, fakeOrderData });
    })
    .catch((err) => {
      console.log("err:", err);
      res.status(500).redirect("/");
    });
});

module.exports = accountRouter;
