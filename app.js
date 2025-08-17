const path = require("path")
const express = require("express");

const app = express();

const port = process.env.PORT || 3001;

//app.get("/", (req, res) => res.type('html').send(html));

const distDir = path.join(__dirname, 'frontend', 'dist');
app.use(express.static(distDir));

// Catch-all for SPA routes (Express 5 / path-to-regexp v6 compatible)
app.use((_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;