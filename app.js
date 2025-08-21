const path = require("path")
const express = require("express");
const app = express();
require('dotenv').config();
const router = require('./api');

const port = process.env.PORT || 3001;

const distDir = path.join(__dirname, 'frontend', 'dist');
app.use(express.static(distDir));

app.use('/api', router);

app.use((_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;