var createError = require('http-errors');
var express = require('express');
var path = require('path');
var router = express.Router();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index')
var app = express();
console.log("Welcome Back");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Pages
//app.get('/', (req,res) => {res.send(`<h4>Site is down<br>Meanwhile, please visit <a href="https://web.archive.org/web/20230911040758/https://shivanshguleria.ml/">archived page</a></h4>`)});
app.use('/', indexRouter);
//404
app.get('*', function(req, res){
  if(req.path.includes("/v4")) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/v4.css">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</head>
<body>
    <main>
        <section>
            <h1 class="fault-head">404</h1>
            Our server had some errors 
            <br>
            <br>
            Issue has been logged
        </section>
    </main>
</body>
</html>`)
  }
  res.render('404', {title: 'Not Found'});
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

console.log("Server is running 🎉🎉");
app.listen(4000)
module.exports = app

