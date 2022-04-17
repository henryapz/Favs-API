require('dotenv').config();

const express = require('express');
const expressConfig = require('./config/expressConf');
const connectDB = require('./config/database');
const routes = require('./routes');

// Express server
const app = express();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  expressConfig(app);
  connectDB();
  routes(app);
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}`);
});
