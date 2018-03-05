# Giftlist

A small script & server to fetch your Amazon Wishlist and return it as JSON.

Warning: the server doesn't cache anything, so don't send traffic from the public internet at it, instead either implement caching, or just use the bin script to periodically refresh a static JSON file.

For a large wishlist, this is pretty slow — I've tested it with my main one which has 340 items in it, and it took 2.6 seconds to fetch. It works by loading each page sequentially, just like a visitor in a web browser does.
