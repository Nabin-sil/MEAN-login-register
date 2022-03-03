const express = require("express");
const router = express.Router();
const authorize = require('../_helpers/authorize');
const OrdersController = require('../order/orderController');


// Handle incoming GET requests to /orders
router.get("/", authorize(), OrdersController.orders_get_all);

router.post("/", authorize(), OrdersController.orders_create_order);

router.get("/:orderId", authorize(), OrdersController.orders_get_order);

router.delete("/:orderId", authorize() , OrdersController.orders_delete_order);

module.exports = router;
