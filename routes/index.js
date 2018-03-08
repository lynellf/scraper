var express = require('express');
var path = require('path');
var router = express.Router();

// App index

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Web Scraper' });
});

// Execute scraper

router.get('/scrape', function(req, res, next) {
    var url = req.body;
  console.log(url);
  res.send('Scraper is working. The url is ' + url);
});

module.exports = router;
