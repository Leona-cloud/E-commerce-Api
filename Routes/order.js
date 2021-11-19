const express = require("express");
const { Cart } = require("../Model/cart");
const router = express.Router();
const { Order } = require("../Model/Order");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const orderList = await Order.find()
    .populate("User", "name email phoneNumber")
    .populate({path: 'Cart', populate: 'product'})
    .sort({ dateOrdered: -1 });
  if (!orderList) {
    res.status(500).json({ success: false, message: "order does not exist" });
  }
  res.send(orderList);
});

router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "User",
    "name email phoneNumber"
  ).populate({path: 'Cart', populate: 'product'});
  if (!order) {
    res.status(500).json({ success: false, message: "order does not exist" });
  }
  res.send(order);
});

router.post("/", [auth, admin], async (req, res) => {
  const cartId = Promise.all(
    req.body.Cart.map(async (cart) => {
      let newCartItem = new Cart({
        quantity: cart.quantity,
        product: cart.product,
      });

      newCartItem = await newCartItem.save();

      return newCartItem._id;
    })
  );

  const resolvedCart = await cartId;

  let order = new Order({
    Cart: resolvedCart,
    shippingAddress: req.body.shippingAddress,
    city: req.body.city,
    country: req.body.country,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    User: req.body.User,
  });

  try {
    order = await order.save();
    res.send(order);
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;
