const { Router } = require("express");
const boxRouter = Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin = require("../middleware/isAdmin");
const { isValidObjectId } = require("mongoose");

const BoxModel = require("../models/Box.model");
const fileUploader = require("../config/cloudinary.config");

// Routers
boxRouter.get("/", (req, res) => {
  const session = req.session;
  // To render the edit and delete button in views when the logged in user is admin
  if (req.session.user && req.session.user.role === "admin") {
    req.session.isAdmin = true;
  }
  BoxModel.find({}).then((boxes) => {
    res.render("box/box-history", { session, boxes });
  });
  // res.render("box/box-history", { session, fakeBoxData });
});

// Todo: Create box with admin access

// Create Box @admin
boxRouter.get("/create", isLoggedIn, isAdmin, (req, res) => {
  res.render("box/create");
});

boxRouter.post(
  "/create",
  isLoggedIn,
  isAdmin,
  fileUploader.single("imageUrl"),
  (req, res) => {
    const { title, description, releaseMonth, releaseYear } = req.body;

    BoxModel.create({
      title,
      description,
      releaseMonth,
      releaseYear,
      imageUrl: req.file.path,
    })
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
  }
);

// Update Box Infos @admin
boxRouter.get("/update/:boxId", isLoggedIn, isAdmin, (req, res) => {
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
      console.log(selectedBox);
      res.render("box/update", { box: selectedBox });
    })
    .catch((err) => {
      console.log("err:", err);
      res.status(500).redirect("/box");
    });
});

boxRouter.post(
  "/update/:boxId",
  isLoggedIn,
  isAdmin,
  fileUploader.single("imageUrl"),
  async (req, res) => {
    const { boxId } = req.params;
    const { title, description, releaseMonth, releaseYear, existingImage } =
      req.body;

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }

    await BoxModel.findByIdAndUpdate(
      { _id: boxId },
      {
        title,
        description,
        releaseMonth,
        releaseYear,
        imageUrl,
      },
      { new: true }
    );
    res.redirect("/box");
  }
);

// Delete A Box @admin
boxRouter.get("/delete/:boxId", isLoggedIn, isAdmin, (req, res) => {
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
