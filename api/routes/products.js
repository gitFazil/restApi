const express = require("express");
const multer = require("multer");
const checkAuth = require("../middelware/check-auth");
const productController = require("../controller/productCTRL");

const Router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = new Date().toISOString().replace(/:/g, "-");
    cb(null, uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  let ext = file.mimetype;
  if (ext == "image/jpeg" || ext == "image/jpg" || ext == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

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
