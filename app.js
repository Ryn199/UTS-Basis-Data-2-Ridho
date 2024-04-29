var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//import flsah
const flash = require("connect-flash");
//import session
const session = require("express-session");


// mengimport mongoose
const mongoose = require("mongoose");
//import method override
const methodOverride = require("method-override")

/**
 * mengubungkan ke database
 * mongoose.connect sebuah metode yang berfungsi untuk mengubungkan ke MongoDB
 * 27017 adalah lokal port default
 * jika menggunakan angka 27017 gagal bisa menggunakan 127.0.0.1
 */
mongoose.connect("mongodb://localhost:27017/db_timnas");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//mengambil fungsi routw timnas
const timnasRouter = require("./routes/timnas");

var app = express();  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//menggunakan method override
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 6000},
  })
);
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/timnas", timnasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
