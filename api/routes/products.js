const express = require("express");

const checkAuth = require("../middelware/check-auth");
const productController = require("../controller/productCTRL");
const upload = require("../util/multer");
// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary.config({
//   cloud_name: "dg1rudz5a",
//   api_key: "516435253184156",
//   api_secret: "k0Gvn4AavDPNaOGp8ZLWQdpnAEY",
// });
const Router = express.Router();
// var storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: "demo",
//   allowedFormats: ["jpg", "png"],
// });
// const upload = multer({
//   storage: storage,
// });

Router.get("/", productController.products_get_all);
Router.get("/:productId", productController.products_get_one);

Router.post(
  "/",
  checkAuth,
  upload.single("productImg"),
  productController.products_create
);

Router.patch("/:productId", productController.products_update);

Router.delete("/:productId", productController.products_delete);

module.exports = Router;
