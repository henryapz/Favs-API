require('dotenv').config();
const Item = require('./item.model');

async function createItem(req, res) {
  try {
    const { title, description, link } = req.body;

    if (!title) {
      res.status(400).json({ error: 'Title is required' });
    }

    const item = await Item.create({ title, description, link });

    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

module.exports = {
  createItem,
};
