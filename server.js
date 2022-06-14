var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
const db = require('./queries')
const bcrypt = require("bcrypt");
var bodyParser = require('body-parser'); //parse request parameters
const req = require('express/lib/request');
const { request } = require('http');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: "Hotmail",
    port: 587,
    auth: {
        user: 'tree.electronics.awsom@hotmail.com',
        pass: 'tree.electronics123'
    }
});



app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true })); //parsing bodies from URL. extended: true specifies that req.body object will contain values of any type instead of just strings.
app.use(bodyParser.json()); //for parsing json objects


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/dashboard.html'));
})

app.get('/sign-in', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/sign-in.html'));
})

app.get('/sign-up', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/sign-up.html'));
})

app.get('/contact-us-page', function (req, res) {
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

app.get('/buy-cell-phone', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/buy-cell-phone.html'));
})

app.get('/buy-pc', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/buy-pc.html'));
})

app.get('/profile-details', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/profile-details.html'));
})

app.listen(port);
console.log('Server started! At http://localhost:' + port);



app.post('/sign-in-parameters', function (req, res) {
    if (req.body.response === undefined || req.body.response === '' || req.body.response === null) {
        return res.json({ "responseCode": 1, "responseDesc": "Please select captcha" });
    }
    var secretKey = "6LebMGkgAAAAALx7k1QSWAsYZA9g7Wm9sFcDJyMA"
    var verificationURL = "http://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.response + "&remoteip" + req.socket.remoteAddress;
    request(verificationURL, function (error, response, body) {
        body = JSON.parse(body);
        if (body.success !== undefined && !body.success) {
            return res.json({ "responseError": "Failed captcha verification" });
        }
        res.json({ "responseCode": 0, "responseDesc": "Success" });
    });

    const myPlaintextPassword = req.body.password;
    const hash = bcrypt.hashSync(myPlaintextPassword, 5); // need to hash as well like sign up 
    const listOfParameters = [req.body.email, hash] // only email and password (hash)


})


app.post('/sign-up-parameters', function (req, res) {
    if (req.body.response === undefined || req.body.response === '' || req.body.response === null) {
        return res.json({ "responseError": "something goes to wrong" });
    }
    var secretKey = "6LebMGkgAAAAALx7k1QSWAsYZA9g7Wm9sFcDJyMA"
    var verificationURL = "http://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.response + "&remoteip" + req.socket.remoteAddress;
    request(verificationURL, function (error, response, body) {
        body = JSON.parse(body);
        if (body.success !== undefined && !body.success) {
            return res.json({ "responseError": "Failed captcha verification" });
        }
        res.json({ "responseSuccess": "Success" });
    });
    var mailOptions = {
        from: 'tree.electronics.awsom@hotmail.com',
        to: req.body.email,
        subject: 'account created',
        text: 'please use this link to complete account creation!'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


    const myPlaintextPassword = req.body.password;
    const hash = bcrypt.hashSync(myPlaintextPassword, 5);
    const listOfParameters = [req.body.name, req.body.lastName, req.body.email, hash, req.body.promoCode]
    db.sign_up_user(res, listOfParameters);

})