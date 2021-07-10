const express = require("express");
const router = express.Router();

// Require the controllers
const item_controller = require("../controllers/item.controller");

router.post("/create", item_controller.item_create); // Add a new Otem
router.get("/list", item_controller.item_list); // Get all Items
router.put("/:id", item_controller.item_update); // Update Item
router.delete("/:id", item_controller.item_delete); // Delete Item

module.exports = router;
