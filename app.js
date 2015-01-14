var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var moment = require('moment');

var routes = require('./routes/index');
var pulls = require('./routes/pulls');
var issues = require('./routes/issues');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')

// app locals
app.locals.moment = function(time) {
  return moment(time, moment.ISO_8601).fromNow();
}

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/pulls', pulls);
app.use('/issues', issues)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.set('titlee', 'My Site');

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
