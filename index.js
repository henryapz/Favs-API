require('dotenv').config();

const express = require('express');
const expressConfig = require('./config/expressConf');

// Express server
const app = express();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  expressConfig.config(app);

  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}`);
});
