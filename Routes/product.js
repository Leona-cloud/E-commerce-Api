const _ = require("lodash");
const mongoose = require("mongoose");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const { Product } = require("../Model/Product");
const { Category } = require("../Model/category");

router.get(`/`, auth, async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const productList = await Product.find(filter).populate("category");

  res.send(productList);
});

router.get("/:id", auth, async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product)
    return res
      .status(400)
      .json({
        success: false,
        message: "Product with the given id doesn't exist ",
      });

  res.send(product);
});

router.post("/", [auth, admin], async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid category");

  let product = new Product(
    _.pick(req.body, [
      "name",
      "description",
      " richDescription",
      " image",
      "brand",
      "price",
      "countInStock",
      "category",
      "rating",
      "isFeatured",
      "numReviews",
    ])
  );

  try {
    product = await product.save();
    res.send(product);
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
});

router.put("/:id", [auth, admin], async (req, res) => {
  const category = await Category.findById(req.params.category);
  if (!category) return res.status(400).send("Invalid category");

  let product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      countInStock: req.body.countInStock,
      category: req.body.category,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
      numReviews: req.body.numReviews,
    },
    { new: true }
  );
  try {
    if (!product) return res.status(400).send("This product does not exist");
    res.send(product);
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  let product = await Product.findByIdAndRemove(req.params.id);
  try {
    if (!product) {
      return res
        .status(404)
        .json({
          success: false,
          message: "product with the given id does not exist",
        });
    } else {
      return res.json({ success: true, message: "product has been deleted" });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
});

router.get("/get/featured/:count", auth, async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);

  if (!products)
    return res.status(500).json({ success: false, message: "not featured" });

  res.send(products);
});

module.exports = router;
