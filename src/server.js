const express = require("express");
const pino = require("express-pino-logger");
const formBody = require("body/form");

const getWishlist = require("./wishlist");

const app = express();

app.get("/favicon.ico", (req, res) => res.end(""));

app.use(pino());

app.get("/:tld/:id", (req, res) => {
  const url = `https://www.amazon.${req.params.tld}/registry/wishlist/${
    req.params.id
  }`;

  getWishlist(url).then(list => {
    res.json({ list });
    res.end();
  });
});

app.listen(process.env.PORT || 8080);
