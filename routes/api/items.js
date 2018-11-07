const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// @route GET api/items
// @desc Get All Items
// @access Public
// /api/items

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 }) // 1:asc || -1:desc
    .then(items => res.json(items));
});

// @route POST api/items
// @desc Create an item
// @access Public
// /api/items

router.post("/", (req, res) => {
  const { name } = req.body;
  const newItem = new Item({
    name
  });
  newItem.save().then(item => res.json(item));
});

// @route DELETE api/items
// @desc Delete an item
// @access Public
// /api/items

router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
