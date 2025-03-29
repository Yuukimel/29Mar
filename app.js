var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://S6:<db_password>@data.rkbji.mongodb.net/?retryWrites=true&w=majority&appName=data&stl=true";
let { CreateSuccessResponse, CreateErrorResponse } = require('./utils/responseHandler')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

mongoose.connect("mongodb+srv://S6:<db_password>@data.rkbji.mongodb.net/?retryWrites=true&w=majority&appName=data&stl=true");
mongoose.connection.on('connected',()=>{
  console.log("connected");
})
.then(() => console.log('Kết nối MongoDB thành công!'))
.catch(err => console.error(' Lỗi kết nối MongoDB:', err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', require('./routes/auth'));
app.use('/roles', require('./routes/roles'));
app.use('/products', require('./routes/products'));
app.use('/categories', require('./routes/categories'));

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
  CreateErrorResponse(res, err.status||500, err.message)
});


//

module.exports = app;
