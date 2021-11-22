const express = require("express");
const { Cart } = require("../Model/cart");
const router = express.Router();
const { Order } = require("../Model/Order");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

router.get("/", [auth, admin], async (req, res) => {
  const orderList = await Order.find()
    .populate('user', 'name email phoneNumber')
    .populate({ path: 'Cart', populate: 'product' })
    .sort({ dateOrdered: -1 });
  if (!orderList) {
    return res.status(500).json({ success: false, message: "order does not exist" });
  }
  res.send(orderList);
});

router.get("/:id", [auth, admin], async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email phoneNumber")
    .populate({
      path: "Cart",
      populate: { path: "product", populate: "category" },
    });
  if (!order) {
   return  res.status(500).json({ success: false, message: "order does not exist" });
  }
  res.send(order);
});

router.post("/", auth, async (req, res) => {
  const cartIds = Promise.all(
    req.body.Cart.map(async (cart) => {
      let newCartItem = new Cart({
        quantity: cart.quantity,
        product: cart.product,
      });

      newCartItem = await newCartItem.save();

      return newCartItem._id;
    })
  );

  const resolvedCart = await cartIds;

  const totalPrices = await Promise.all(
    resolvedCart.map(async (cartId) => {
      const cartItem = await Cart.findById(cartId).populate("product", "price");
      const totalPrice = (await cartItem.product.price) * cartItem.quantity;

      return totalPrice;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  let order = new Order({
    Cart: resolvedCart,
    shippingAddress: req.body.shippingAddress,
    city: req.body.city,
    country: req.body.country,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });

  try {
    order = await order.save();
    return res.send(order);
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
});

router.put("/:id", [auth, admin], async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );
  try {
    if (!order) {
      res.status(500).json({ success: false, message: "order does not exist" });
    }
    res.send(order);
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const order = await Order.findByIdAndRemove(req.params.id);
  try {
    if (order) {
      await order.Cart.map(async (cartItem) => {
        await Cart.findByIdAndRemove(cartItem);
      });
      return res.status(404).json({
        success: true,
        message: "order has been deleted",
      });
    } else {
      return res.json({
        success: false,
        message: "order with the given id does not exist",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
});

router.get("/get/totalSales", [auth, admin], async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
  ]);
  if (!totalSales) {
    return res.status(400).json({ message: "total sales can't be generated" });
  } else {
    res.send({ totalsales: totalSales.pop().totalsales });
  }
});

router.get("/get/count", async (req, res) => {
  const orderCount = await Order.countDocuments((count) => count);

  if (!orderCount) {
    return res.status(400).json({ success: false });
  }
  res.send({ orderCount: orderCount });
})



router.get("/user/orders/:userid", [auth, admin], async (req, res) => {
  const orderList = await Order.find({user: req.params.userid})
  .populate({
    path: "Cart",
    populate: { path: "product", populate: "category" },
  })
    .sort({ dateOrdered: -1 });
  if (!orderList) {
   return res.status(500).json({ success: false, message: "order does not exist" });
  }
  res.send(orderList);
});


module.exports = router;

