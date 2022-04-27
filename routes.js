const user = require('./api/user');
const item = require('./api/item');
const favListitem = require('./api/favoriteList');

function routes(app) {
  app.use('/api/users', user);
  app.use('/api/items', item);
  app.use('/api/favs', favListitem);
  app.get('/', (req, res) => {
    res.status(200).json({ success: true });
  });
}

module.exports = routes;
