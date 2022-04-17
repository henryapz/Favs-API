const mongoose = require('mongoose');

const FavoriteListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    favItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('FavoriteList', FavoriteListSchema);
