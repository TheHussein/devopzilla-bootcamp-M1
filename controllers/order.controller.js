const Order = require("../models/order.model");

// Create a new Order
exports.order_create = async function (req, res, next) {
  try {
    var order = new Order(req.body);
    var result = await order.save();
    res.send(result);
  } catch (err) {
    next(err);
  }
};

// Get all Orders
exports.order_list = function (req, res, next) {
  Order.find(function (err, order) {
    if (err) return next(err);
    if (!order) res.status(404).send({ error: "No Orders found." });
    res.send(order);
  });
};

// Update a Order identified by it's id
exports.order_update = async function (req, res, next) {
  order_id = req.params.id;
  Order.findByIdAndUpdate(
    order_id,
    { $set: req.body },
    { new: true },
    function (err, order) {
      if (err) return next(err);
      res.send({ message: "Order updated successfully.", order });
    }
  );
};

// Delete a Order identified by it's id
exports.order_delete = async function (req, res, next) {
  order_id = req.params.id;
  Order.findByIdAndRemove(order_id, function (err) {
    if (err) return next(err);
    res.send("Order Deleted successfully!");
  });
};
