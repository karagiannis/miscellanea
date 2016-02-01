

var url = process.argv[2] || "http://46.101.232.43/ ";

var scraper = require("./lib/utility").scraper;

scraper(url);
