const multer = require("multer");
const multerStorage = multer.diskStorage({
  destination: "./uploads",
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: multerStorage });

module.exports = {
  multerStorage,
  upload,
};
