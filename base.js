const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const users = require("./Routes/Auth");
const product = require("./Routes/product");
const categories = require("./Routes/category");
const order = require("./Routes/order");

const app = express();

if (!process.env.ecommerce_jwtPrivateKey) {
  console.error("FATAL ERROR: jwtPrivateKey not defined");
  process.exit(1);
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", users);
app.use("/api/categories", categories);
app.use("/api/product", product);
app.use("/api/order", order);

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.error("unable to connect", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}.....`);
});
