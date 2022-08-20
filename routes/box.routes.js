const { Router } = require("express");
const boxRouter = Router();
const { isValidObjectId } = require("mongoose");

const BoxModel = require("../models/Box.model");

// Routers
boxRouter.get("/", (req, res) => {
  const session = req.session;
  BoxModel.find({}).then((boxes) => {
    res.render("box/box-history", { session, boxes });
  });
  // res.render("box/box-history", { session, fakeBoxData });
});

// Todo: Create box with admin access

// Create Box @admin
boxRouter.get("/create", (req, res) => {
  res.render("box/create");
});

boxRouter.post("/create", (req, res) => {
  const { title, description, releaseMonth, releaseYear, imageUrl } = req.body;

  BoxModel.create({ title, description, releaseMonth, releaseYear, imageUrl })
    .then((response) => {
      res.redirect("/box");
    })
    .catch((err) => {
      console.log("error failing creating a box", err);
      res.status(500).render("box/create", {
        errorMessage: "Somethig went wrong. Please create the box again.",
        ...req.body,
      });
    });
});

// Update Box Infos @admin
boxRouter.get("/update/:boxId", (req, res) => {
  const { boxId } = req.params;
  const isValidBoxId = isValidObjectId(boxId);

  if (!isValidBoxId) {
    return res.status(404).redirect("/box");
  }

  BoxModel.findOne({ _id: boxId })
    .then((selectedBox) => {
      if (!selectedBox) {
        return res.redirect("/box");
      }
      res.render("box/update", { box: selectedBox });
    })
    .catch((err) => {
      console.log("err:", err);
      res.status(500).redirect("/box");
    });
});

boxRouter.post("/update/:boxId", async (req, res) => {
  const { boxId } = req.params;
  const { title, description, releaseMonth, releaseYear, imageUrl } = req.body;

  await BoxModel.findByIdAndUpdate(
    { _id: boxId },
    {
      title,
      description,
      releaseMonth,
      releaseYear,
      imageUrl,
    }
  );
  res.redirect("/box");
});

// Delete A Box @admin
boxRouter.get("/delete/:boxId", (req, res) => {
  const { boxId } = req.params;

  BoxModel.findByIdAndDelete({ _id: boxId })
    .then(() => {
      res.redirect("/box");
    })
    .catch((err) => console.log(err));
});

// Todo: Render Box detail page
boxRouter.get("/:boxId", (req, res) => {
  const session = req.session;
  const { boxId } = req.params;
  console.log(req.params);
  BoxModel.findById({ _id: boxId })
    .then((selectedBox) => {
      if (!selectedBox) {
        return res.redirect("/box");
      }
      res.render("box/box-detail", { session, box: selectedBox });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = boxRouter;
