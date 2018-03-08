var express = require('express');
var path = require('path');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
var router = require('./routes/index');

// Console Logger via Morgan
app.use(logger('dev'));

//View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Bodyparser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//App controller
app.use('/', router);

// App initalization
app.listen(port, function() {
  console.log('The APP is listening on port' + port);
});
