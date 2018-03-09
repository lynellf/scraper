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
    var json = {items: []};
    
  request(url, function(error, response, html) {
    if(!error) {
      var $ = cheerio.load(html);
      var li;

      $('li').filter(function(i, el) {
        var data = $(this);
        var itmes = data.text();
        json.items = items;
      })

      fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
    console.log('Check project directory for output');
  })
    } else {
      console.log(error);
    }
  })
  
  res.send('Scraper is working. The url is ' + url);
});

module.exports = router;
