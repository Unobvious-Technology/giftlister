# Giftlist

A small script & server to fetch your Amazon Wishlist and return it as JSON.

Warning: the server doesn't cache anything, so don't send traffic from the public internet at it, instead either implement caching, or just use the bin script to periodically refresh a static JSON file.

For a large wishlist, this is pretty slow — I've tested it with my main one which has 340 items in it, and it took 2.6 seconds to fetch. It works by loading each page sequentially, just like a visitor in a web browser does.

To use this, you'll need some familiarity with the command line, likely need to be running Mac OS X or Unix, and also need to have node.js and npm installed (you can do this from nodejs.org). In order to run:

```
bin/giftlist-downloader.js [wishlistURL]
```

That'll print the JSON of the wishlist, to save to a file:

```
bin/giftlist-downloader.js [wishlistURL] > my-wishlist.json
```

You can then use this json file with jQuery / Vue / React / etc to render a pretty interface. If you have high traffic volumes, I highly recommend adding a cache in front of the images (e.g., fastly or cloudflare) to ensure you aren't blocked due to hotlinking images.
