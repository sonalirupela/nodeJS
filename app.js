// newrelic integration for api report
if (process.env.NODE_ENV === 'staging') {
  require('newrelic');
}

var express = require('express');
var config = require('config');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var users = require('./routes/users');

mongoose.Promise = Promise;

// setup middleware
var app = express();

// allow cross origin
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

        /*bodyparser*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// create server
var server = http.createServer(app);
//configure the promise
Promise.config({
        // Enables all warnings except forgotten return statements.
        warnings: false,
        longStackTraces: false,
        // Enable cancellation.
        cancellation: true
    });



//data base connection with promisifying it
var connectAsync = Promise.promisify(mongoose.connect, { context: mongoose });
var listenAsync = Promise.promisify(server.listen, { context: server });

connectAsync(config.get('mongodbUrl'))
  .then(function () {
    return listenAsync(2121);
  }).then(function () {
    return console.info("Server online on port:" + JSON.stringify(server.address().port));
  }).catch(function (err) {
    throw err;
  });


app.use('/crud', routes);
