const { Router } = require('express');
const {
  createFavList,
  getFavList,
  getFavListById,
  deleteFavListById,
} = require('./favoriteList.controller');
const isAuthenticated = require('../../middleware/auth');

const router = Router();

// Create Item
router.post('/', isAuthenticated, createFavList);
router.get('/', isAuthenticated, getFavList);
router.get('/:id', isAuthenticated, getFavListById);
router.delete('/:id', isAuthenticated, deleteFavListById);

module.exports = router;
