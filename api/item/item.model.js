const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: { unique: true },
    },
    description: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model('Item', ItemSchema);
