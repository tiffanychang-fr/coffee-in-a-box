const { isValidObjectId } = require("mongoose");
const { Router } = require("express");
const userRouter = Router();

const UserModel = require("../models/User.model");

// Logged In View
userRouter.get("/account/:userId", (req, res) => {
  const isValidId = isValidObjectId(req.params.userId);

  if (!isValidId) {
    return res.redirect("/");
  }

  UserModel.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.redirect("/");
      }

      res.render("user/account", { user });
    })
    .catch((err) => {
      console.log("err:", err);
      res.status(500).redirect("/");
    });
});

module.exports = userRouter;
