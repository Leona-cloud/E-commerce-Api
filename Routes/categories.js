const { Category } = require("../Model/category");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", auth, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res
      .status(500)
      .json({ success: false, message: "category does not exist" });
  }
  res.send(categoryList);
});

router.get("/:id", auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({
          success: false,
          message: "category with the given id does not exist",
        });
    }
    res.status(200).send(category);
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
});

router.post("/", [auth, admin], async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  try {
    category = await category.save();
    res.send(category);
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    let category = await Category.findByIdAndRemove(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({
          success: false,
          message: "category with the given id does not exist",
        });
    } else {
      return res.json({ success: true, message: "category has been deleted" });
    }
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

router.put("/:id", [auth, admin], async (req, res) => {
  try {
    let category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
      },
      { new: true }
    );

    if (!category) return res.status(400).send("This category does not exist");
    res.send(category);
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

module.exports = router;
