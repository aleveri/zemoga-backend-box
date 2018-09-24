var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
require('./schemas/box');
require('./schemas/vote');
var routes = require('./routes/boxRoutes');
var context = require('./persistence/dbContext');

var app = express();
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"]
    }
}));
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    res.header('Access-Control-Max-Age', 86400);
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '1mb' }));
context.generate();
app.use('/', routes);
app.listen('7000');