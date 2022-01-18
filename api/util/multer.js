const multer = require("multer");
// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = file.mimetype;
    console.log(ext);
    if (ext !== "image/jpg" && ext !== "image/jpeg" && ext !== "image/png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});
