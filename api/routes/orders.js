const express = require("express");
const orderController = require("../controller/ordersCtrl");
const checkAuth = require("../middelware/check-auth");
const Router = express.Router();

Router.get("/", checkAuth, orderController.orders_get_all);
Router.get("/:orderId", checkAuth, orderController.orders_get_detail);
Router.post("/", checkAuth, orderController.orders_create_order);
Router.patch("/:orderId", checkAuth, orderController.orders_update);
Router.delete("/:orderId", checkAuth, (req, res) => {
  res.json({ msg: "order deleted ", id: req.params.id });
});

module.exports = Router;
