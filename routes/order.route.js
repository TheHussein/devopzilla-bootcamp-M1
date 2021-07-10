const express = require("express");
const router = express.Router();

// Require the controllers
const order_controller = require("../controllers/order.controller");

router.post("/create", order_controller.order_create); // Add a new Order
router.get("/list", order_controller.order_list); // Get all Orders
router.put("/:id", order_controller.order_update); // Update Order
router.delete("/:id", order_controller.order_delete); // Delete Order

module.exports = router;
