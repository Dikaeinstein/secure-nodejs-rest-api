var express = require('express');
var app = express();
var db = require('./db');

const AuthController = require('./auth/AuthenticationController');
var UserController = require('./user/UserController');

app.use('/users', UserController);
app.use('/api/auth', AuthController);

module.exports = app;