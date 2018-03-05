#!/usr/bin/env node

const URL = require("url");
const getWishlist = require("../src/wishlist");

const url = process.argv[2];

getWishlist(url).then(list => {
  process.stdout.write(JSON.stringify(list, null, 2));
});
