require('dotenv').config();
const Item = require('./item.model');

async function createItem(req, res) {
  try {
    const { title, description, link } = req.body;

    if (!title) {
      res.status(400).json({ error: 'title is required' });
    }else {
      const item = await Item.create({ title, description, link });
      res.status(201).json(item);
    }

  } catch (err) {
    res.status(500).json({ error: err });
  }
}

module.exports = {
  createItem,
};
