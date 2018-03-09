var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
var fs = require('fs');

// App index

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Web Scraper' });
});

// Execute scraper

router.post('/scrape', function(req, res, next) {
  var url = req.body.url;
  var json = { items: '' };

  function runScraper(html) {
    var $ = cheerio.load(html);
    var li = [];
    $('li').filter(function() {
      var data = $(this);
      li.push(data.text());
    });
    return li;
  }

  function scrape(url) {
    return new Promise(function(resolve, reject) {
      request(url, function(error, response, html) {
        if (error) {
          reject(error);
        } else {
          resolve(runScraper(html));
        }
      });
    });
  }

  scrape(url).then(function(result) {
    json.items = result;
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
      console.log('Check project directory for output');
    });
    res.send('Scraper is working. The url is ' + url);
  });
});

module.exports = router;
