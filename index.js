require('dotenv').config();

const express = require('express');

// Express server
const app = express();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}`);
});
