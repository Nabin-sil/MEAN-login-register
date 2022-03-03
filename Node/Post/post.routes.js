const express = require("express");
const router = express.Router();
const multer = require('multer');
const authorize = require('../_helpers/authorize');
const PostsController = require('../Post/postController');


const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];

        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});


// Handle incoming GET requests to /orders
router.get("/", authorize(), PostsController.posts_create);

router.post("/add", authorize(), multer({ storage: storage }).single("image"), PostsController.posts_create);

//router.get("/:orderId", authorize(), OrdersController.orders_get_order);

//router.delete("/:orderId", authorize() , OrdersController.orders_delete_order);

module.exports = router;
