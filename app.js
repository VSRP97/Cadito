var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

var usersRouter = require('./src/routes/users');
var postsRouter = require('./src/routes/posts');
var cartsRouter = require('./src/routes/carts');
var reviewsRouter = require('./src/routes/reviews');
var historyRouter = require('./src/routes/history');

var app = express();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/users', usersRouter);
app.use('/posts', postsRouter)
app.use('/cart', cartsRouter);
app.use('/reviews', reviewsRouter);
app.use('/history', historyRouter);

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

// DB configuration and connection create
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});

app.listen(process.env.PORT, () => { console.log(`server is running on port ${process.env.PORT}`) })