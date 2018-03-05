const rp = require("request-promise");
const cheerio = require("cheerio");
const URL = require("url");

const selectors = {
  title: "#wl-list-info .profile-list-name",
  nextPage: "a.wl-see-more",
  items: "#g-items div[data-id]",
  itemTitle: "h5",
  itemId: "h5 a",
  itemPriority: ".g-item-comment-row span span.a-hidden",
  itemComment: ".g-item-comment-row .g-comment-quote.a-text-quote",
  itemPrice: ".a-price"
};

function getPage(url, baseUrl) {
  var options = {
    uri: url,
    transform: body => cheerio.load(body)
  };

  return rp(options).then($ => {
    const nextPageHref = $(selectors.nextPage).attr("href");
    const nextPageUrl = nextPageHref && URL.resolve(baseUrl, nextPageHref);

    return {
      items: getItems($, baseUrl),
      nextPageUrl
    };
  });
}

function getItems($, baseUrl) {
  const $items = $(selectors.items);
  var items = [];

  $items.each((index, element) => {
    if ($(element).attr("data-price") == "-Infinity") return;

    const title = $(selectors.itemTitle, element)
      .text()
      .trim();
    const link = $(selectors.itemId, element).attr("href");
    const id = link.split("/")[2];

    const price = $(selectors.itemPrice, element);
    const currency = $(".a-price-symbol", price).text();
    const whole = $(".a-price-whole", price).text();
    const fraction = $(".a-price-fraction", price).text();

    items.push({
      id: id,
      title: title,
      link: URL.resolve(baseUrl, link),
      image: $(".g-itemImage img", element).attr("src"),
      price: {
        currency,
        whole,
        fraction
      }
    });
  });

  return items;
}

function getPagesRecursive(url, items) {
  const baseUrl = URL.resolve(url, "/");

  return getPage(url, baseUrl).then(data => {
    const newItems = items.concat(data.items);

    if (data.nextPageUrl) {
      return getPagesRecursive(data.nextPageUrl, newItems);
    } else {
      return newItems;
    }
  });
}

module.exports = function getWishlist(url) {
  return getPagesRecursive(url, []).then(items => {
    return {
      url: url,
      items
    };
  });
};
