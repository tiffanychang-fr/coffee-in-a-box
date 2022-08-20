const { Router } = require("express");
const boxRouter = Router();

const BoxModel = require("../models/Box.model");

const fakeBoxData = [
  {
    title: "CALL-IT-WHATEVER-BOX",
    description: "You find more details in this page",
    releaseMonth: "MONTH",
    releaseYear: "YEAR",
    imageUrl: "images/coffee-bean-1.jpg",
  },
  {
    title: "CALL-IT-WHATEVER-BOX",
    description: "You find more details in this page",
    releaseMonth: "MONTH",
    releaseYear: "YEAR",
    imageUrl: "images/coffee-bean-2.jpg",
  },
  {
    title: "CALL-IT-WHATEVER-BOX",
    description: "You find more details in this page",
    releaseMonth: "MONTH",
    releaseYear: "YEAR",
    imageUrl: "images/coffee-bean-3.jpg",
  },
];

// Routers
boxRouter.get("/", (req, res) => {
  const session = req.session;
  res.render("box/box-history", { session, fakeBoxData });
});

module.exports = boxRouter;
