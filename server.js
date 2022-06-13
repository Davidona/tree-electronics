var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
const db = require('./queries')

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/dashboard.html'));
})

app.get('/sign-in', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/sign-in.html'));
})

app.get('/sign-up', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/sign-up.html'));
})

app.get('/contact-us', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/contact-us-page.html'));
})

app.get('/reset-password', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/reset-password.html'));
})

app.get('/update-password', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/update-password.html'));
})
app.get('/reset-password-request', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/reset-password-request.html'));
})

app.listen(port);
console.log('Server started! At http://localhost:' + port);
