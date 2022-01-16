const Product = require("../models/product");
const mongoose = require("mongoose");
const productURL = "http://localhost:5000/products/";

exports.products_get_all = (req, res) => {
  Product.find()
    .select("name price productImg")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        product: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            productImg: doc.productImg,
            request: {
              type: "GET",
              description: "Detail Product",
              url: productURL + doc._id,
            },
          };
        }),
      };
      console.log(req.params);
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.products_create = (req, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImg: req.file.destination + req.file.filename,
  });
  product
    .save()
    .then((result) => {
      res.status(200).json({
        data: result,
        request: {
          type: "GET",
          description: "get all products",
          url: productURL,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.products_get_one = (req, res) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("_id name price")
    .exec()
    .then((doc) => {
      const response = {
        _id: doc._id,
        name: doc.name,
        price: doc.price,
        request: {
          description: "Back to the all product",
          type: "POST",
          url: productURL,
        },
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.products_update = (req, res) => {
  let id = req.params.productId;

  let updateOps = {};
  for (let ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((docs) => {
      res.status(200).json("update successfully");
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
exports.products_delete = (req, res) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({
        msg: "delete successfully",
        request: {
          type: "POST",
          url: productURL,
          body: {
            name: "String",
            price: "Number",
          },
        },
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
