const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const products = require("./api/routes/products");
const orders = require("./api/routes/orders");
const users = require("./api/routes/users");
const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();
//mongoose connection

mongoose.connect(process.env.mongodb);
app.use(morgan("dev"));
//body parser

app.use(express.json());
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Orgin", "*");
  req.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Accept,Authorization,Content-Type"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});
app.use("/uploads", express.static("uploads"));
app.use("/products", products);
app.use("/orders", orders);
app.use("/users", users);
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
