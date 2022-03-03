const express = require("express");
const router = express.Router();
const multer = require('multer');
const authorize = require('../_helpers/authorize');
const ProductsController = require('./productController');
const Role = require('_helpers/role');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:|\./g,'') + ' - ' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", authorize(), ProductsController.products_get_all);

router.post("/add",  authorize(), upload.single('productImage'), ProductsController.products_create_product);

//router.post("/add",  authorize(), ProductsController.products_create_product);

router.get("/read/:productId", authorize(), ProductsController.products_get_product);

router.patch("/update/:productId", authorize(), ProductsController.products_update_product);

router.delete("/delete/:productId", authorize(), ProductsController.products_delete);

module.exports = router;
