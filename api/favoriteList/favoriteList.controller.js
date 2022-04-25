require('dotenv').config();
const FavItem = require('./favoriteList.model');

async function createFavList(req, res) {
  try {
    const { name, favItems } = req.body;
    const { userId } = req.user;

    if (!name) {
      res.status(400).json({ error: 'Favorite List name is required' });
    }

    // Check if user already has a list with this name
    const currentFavList = await FavItem.findOne({ owner: userId, name });
    if (currentFavList) {
      res
        .status(409)
        .json({ error: 'User already has a list with the given name' });
    } else {
      const favItem = await FavItem.create({
        name,
        favItems,
        owner: req.user.userId,
      });

      res.status(201).json(favItem);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function getFavList(req, res) {
  try {
    const owner = req.user.userId;
    const favItem = await FavItem.find({
      owner,
    })
      .populate('favItems')
      .exec();

    res.status(200).json(favItem);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function getFavListById(req, res) {
  try {
    const { id: favListId } = req.params;
    const owner = req.user.userId;

    const favItem = await FavItem.find({
      owner,
      _id: favListId,
    })
      .populate('favItems')
      .exec();

    res.status(200).json(favItem);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

async function deleteFavListById(req, res) {
  try {
    const { id: favListId } = req.params;
    const owner = req.user.userId;

    await FavItem.deleteOne({
      owner,
      _id: favListId,
    });

    res.status(200).json({ result: 'Borrado con exito' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

module.exports = {
  createFavList,
  getFavList,
  getFavListById,
  deleteFavListById,
};
