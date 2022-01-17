const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
var storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "Home/restApiUpload",
  allowedFormats: ["jpg", "png"],
});

upload = multer({
  storage: storage,
});
