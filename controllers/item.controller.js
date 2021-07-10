const Item = require("../models/item.model");

// Create a new Item
exports.item_create = async function (req, res, next) {
  try {
    var item = new Item(req.body);
    var result = await item.save();
    res.send(result);
  } catch (err) {
    next(err);
  }
};

// Get all Items
exports.item_list = function (req, res, next) {
  Item.find(function (err, item) {
    if (err) return next(err);
    if (!item) res.status(404).send({ error: "No Items found." });
    res.send(item);
  });
};

// Update a Item identified by it's id
exports.item_update = async function (req, res, next) {
  item_id = req.params.id;
  Item.findByIdAndUpdate(
    item_id,
    { $set: req.body },
    { new: true },
    function (err, item) {
      if (err) return next(err);
      res.send({ message: "Item updated successfully.", item });
    }
  );
};

// Delete a Item identified by it's id
exports.item_delete = async function (req, res, next) {
  item_id = req.params.id;
  Item.findByIdAndRemove(item_id, function (err) {
    if (err) return next(err);
    res.send({ message: "Item Deleted successfully." });
  });
};
