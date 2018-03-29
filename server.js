const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const api = require('./routes/api');
const PORT = 3000;

// set engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// define middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

let frontDir = path.join(__dirname, '../', 'front-end/dist');
global.frontDir = frontDir;
app.use(express.static(frontDir));

app.get('*', function(req, res) {
    res.sendFile(path.join(global.frontDir + '/index.html'));
    console.log("Connected");
});

/* Error 404 */
app.use(function(req, res, next) {
    let err = new Error("Sorry! Not found");
    err.status = 404;
    next();
});

/* error handler */
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
//error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, function(err) {
    if (!err)
        console.log("Site is live");
    else console.log(err);
    console.log('http://localhost:' + PORT);
});