var generate_feed = require('./setting/rss').generate_feed;

var error, result;

generate_feed().then(feed => console.log(feed)).catch(error_arg => error = error_arg);
