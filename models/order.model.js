// Imports & Declarations
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Model Schema
let OrderSchema = new Schema({
  item_id: { type: String, required: true },
  shopping_cart_id: { type: String, required: false },
  requested_quantity: {
    type: Number,
    required: true,
    min: [0, "Requested quantity cannot be less than 0!"],
  },
  total_cost: {
    type: Number,
    required: true,
  },
});

// Export the model
module.exports = mongoose.model("Order", OrderSchema);
