const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");
var orderURL = "http://localhost:5000/orders/";

exports.orders_get_all = (req, res) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name _id")
    .then((docs) => {
      let response = {
        count: docs.length,
        order: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              description: "detail item",
              url: orderURL + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
exports.orders_get_detail = (req, res) => {
  let id = req.params.orderId;
  Order.findById(id)
    .exec()
    .then((doc) =>
      res.status(200).json({
        _id: doc._id,
        product: doc.product,
        quantity: doc.quantity,
        request: {
          type: "GET",
          url: orderURL,
        },
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

exports.orders_create_order = (req, res) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        let order = new Order({
          _id: mongoose.Types.ObjectId(),
          product: req.body.productId,
          quantity: req.body.quantity,
        });
        order.save().then((docs) => {
          res
            .status(200)
            .json({ msg: "order add successfully", order: docs })
            .catch((err) => {
              res.status(500).json({ error: err });
            });
        });
      }
    })
    .catch((err) => {
      res.status(500).json("product not found");
    });
};

exports.orders_update = (req, res) => {
  let id = req.params.orderId;
  let productOps = {};
  for (let ops of req.body) {
    productOps[ops.propName] = ops.value;
  }
  Order.update(
    { _id: id },
    {
      $set: productOps,
    }
  )
    .exec()
    .then((doc) => {
      res.status(200).json("update Successfully");
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
