// Imports & Declarations
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Model Schema
let ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Cannot have an Item without a name!"],
    maxlength: [20, "Item name can be 20 characters at most!"],
  },
  cost: {
    type: Number,
    required: [true, "Cannot have an Item without a cost!"],
  },
  available_quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity cannot be less than 0!"],
  },
});

// Export the model
module.exports = mongoose.model("Item", ItemSchema);
