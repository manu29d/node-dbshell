/**
 * This file gives the equivalent of `rails console`
 * Does not consider any arguments
 * Does not support any configurations
 * Run the file using `node console.js` from parent directory
 * Heavily dependant on the file structure and naming conventions that exist now
 * Q: Why this when you can do everything using `mongo`?
 * A: Since callbacks like mongoose are not supported
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('mongoose');
var repl = require('repl'),
    fs = require('fs'),
    path = require('path');
var config = require(path.join(__dirname, 'server', 'config', 'environment'));

mongoose.Promise = global.Promise;
// Connect to database
var db = mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

var context = repl.start({}).context,
    ctx = {};

ctx.config = config;

fs.readdirSync(path.join(__dirname, 'server', 'api')).forEach(function (api) {
  var newPath = path.join(__dirname, 'server', 'api', api);
  if (fs.statSync(newPath).isDirectory()) {
    fs.readdirSync(newPath).filter(function (file) {
      return /(.*)\.(js$|coffee$)/.test(file) && file.indexOf('model') > -1 && file.indexOf('spec') === -1
    }).forEach(function (modelFile) {
      require(path.join(newPath, modelFile.replace(/\.js/, '')));
    });
  }
});

for (var property in ctx) {
  context[property] = ctx[property];
}

for (var model in mongoose.models) {
  context[model] = mongoose.models[model];
}
