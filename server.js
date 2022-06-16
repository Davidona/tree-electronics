// var express = require('express');
// var app = express();
// var port = process.env.PORT || 3000;
// var util = require('util');
// var path = require('path');
// const db = require('./queries')
// const bcrypt = require("bcrypt");
// var bodyParser = require('body-parser'); //parse request parameters
// const req = require('express/lib/request');
// const { request } = require('http');
// var nodemailer = require('nodemailer');
// var flash = require('connect-flash');
// var session = require('express-session');
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { domain: 'localhost:3000' }
// }))

// const { Pool, Client } = require('pg')
// var passport = require('passport');


// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));

// app.use(passport.initialize());
// app.use(passport.session());

// var transporter = nodemailer.createTransport({
//     service: "Hotmail",
//     port: 587,
//     auth: {
//         user: 'tree.electronics.awsom@hotmail.com',
//         pass: 'tree.electronics123'
//     }
// });

// const pool = new Pool({
//     user: 'dfhhzifanwocgt',
//     host: 'ec2-54-170-90-26.eu-west-1.compute.amazonaws.com',
//     database: 'dfd28959ibbmsv',
//     password: '7289851ff7f8ec85fabd4e539f334873ac3dff791f6336e219c75753050cb8e8',
//     port: 5432,
//     ssl: {
//         rejectUnauthorized: false
//     }
// })

// app.use(express.static(__dirname));
// app.use(bodyParser.urlencoded({ extended: true })); //parsing bodies from URL. extended: true specifies that req.body object will contain values of any type instead of just strings.
// app.use(bodyParser.json()); //for parsing json objects
// app.use(flash())


// app.use(session({ secret: 'keyboard cat' }))

// app.set('view engine', 'pug');
// app.set('view options', { layout: false });


// const LocalStrategy = require('passport-local').Strategy;

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + '/html/dashboard.html'));
// })

// app.get('/sign-in', function (req, res) {
//     res.sendFile(path.join(__dirname + '/html/sign-in.html'));
// })

// app.get('/sign-up', function (req, res) {
//     res.sendFile(path.join(__dirname + '/html/sign-up.html'));
// })

// app.get('/contact-us-page', function (req, res) {
//     res.sendFile(path.join(__dirname + '/html/contact-us-page.html'));
// })

// app.get('/reset-password', function (req, res) {
//     res.sendFile(path.join(__dirname + '/html/reset-password.html'));
// })

// app.get('/update-password', function (req, res) {
//     res.sendFile(path.join(__dirname + '/html/update-password.html'));
// })

// app.get('/reset-password-request', function (req, res) {
//     res.sendFile(path.join(__dirname + '/html/reset-password-request.html'));
// })

// app.get('/buy-cell-phone', function (req, res) {
//     res.sendFile(path.join(__dirname + '/html/buy-cell-phone.html'));
// })

// app.get('/buy-pc', function (req, res) {
//     res.sendFile(path.join(__dirname + '/html/buy-pc.html'));
// })

// app.get('/profile-details', function (req, res) {
//     res.sendFile(path.join(__dirname + '/html/profile-details.html'));
// })

// app.listen(port);
// console.log('Server started! At http://localhost:' + port);




// // app.get('/sign-in', function (req, res) {
// //     if (req.isAuthenticated()) {
// //         console.log("hi")
// //         res.redirect('./profile-details');
// //     }
// //     else {
// //         console.log("sad")
// //         //res.render('login', {title: "Log in", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
// //     }

// // });



// // app.post('/sign-in', function (req, res, next) {

// //     if (req.body.response === undefined || req.body.response === '' || req.body.response === null) {
// //         return res.json({ "responseCode": 1, "responseDesc": "Please select captcha" });
// //     }

// //     var secretKey = "6LebMGkgAAAAALx7k1QSWAsYZA9g7Wm9sFcDJyMA"
// //     var verificationURL = "http://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.response + "&remoteip" + req.socket.remoteAddress;
// //     request(verificationURL, function (error, response, body) {
// //         body = JSON.parse(body);
// //         if (body.success !== undefined && !body.success) {
// //             return res.json({ "responseError": "Failed captcha verification" });
// //         }

// //     });

// //     const myPlaintextPassword = req.body.password;
// //     const hash = bcrypt.hashSync(myPlaintextPassword, 5); // need to hash as well like sign up 
// //     const listOfParameters = [req.body.email, hash] // only email and password (hash)
// //     console.log("urd")
// //     req.body = { username: req.body.email, password: req.body.password }
// //     return next();


// // }, passport.authenticate('local', { failureRedirect: '/profile-details' }),  function(req, res) {
// // 	//console.log(res);
// // 	res.redirect('/sign-in');
// // }
// // )




// app.use((req, res, next) => {
//     // fake body content for authentication
//     console.log("sa")
//     req.body = { username: req.body.email, password: req.body.password }
//     console.log("ba")
//     next()
// })


// app.post('/sign-in',	passport.authenticate('local', { failureRedirect: '/profile-details' }),  function(req, res) {
//     	//console.log(res);
//     	res.redirect('/profile-details');
//         console.log("das")
//     });



// app.post('/sign-up-parameters', function (req, res) {
//     if (req.body.response === undefined || req.body.response === '' || req.body.response === null) {
//         return res.json({ "responseError": "something goes to wrong" });
//     }

//     var secretKey = "6LebMGkgAAAAALx7k1QSWAsYZA9g7Wm9sFcDJyMA"
//     var verificationURL = "http://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.response + "&remoteip" + req.socket.remoteAddress;
//     request(verificationURL, function (error, response, body) {
//         body = JSON.parse(body);
//         if (body.success !== undefined && !body.success) {
//             return res.json({ "responseError": "Failed captcha verification" });
//         }
//         res.json({ "responseSuccess": "Success" });
//     });
//     var mailOptions = {
//         from: 'tree.electronics.awsom@hotmail.com',
//         to: req.body.email,
//         subject: 'account created',
//         text: 'please use this link to complete account creation!'
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });


//     const myPlaintextPassword = req.body.password;
//     const hash = bcrypt.hashSync(myPlaintextPassword, 5);
//     const listOfParameters = [req.body.name, req.body.lastName, req.body.email, hash, req.body.promoCode]
//     db.sign_up_user(res, listOfParameters);
//     res.redirect('/sign-in')

// })
// passport.use('local', new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {

//     loginAttempt();
//     async function loginAttempt() {


//         const client = await pool.connect()

//         try {

//             await client.query('BEGIN')
//             var currentAccountsData = await JSON.stringify(client.query('SELECT "ID", "Name", "Email", "Password" FROM public."Users" WHERE "Email"=$1', [username], function (err, result) {

//                 if (err) {
//                     return done(err)
//                 }
//                 if (result.rows[0] == null) {
//                     req.flash('danger', "Oops. Incorrect login details.");
//                     console.log('danger', "Oops. Incorrect login details.");
//                     return done(null, false);
//                 }
//                 else {
//                     console.log()
//                     bcrypt.compare(password, result.rows[0].Password, function (err, check) {
//                         if (err) {
//                             console.log('Error while checking password');
//                             return done();
//                         }
//                         else if (check) {
//                             console.log("check")
//                             console.log([{ email: result.rows[0].Email, firstName: result.rows[0].Name }])
//                             return done(null, [{ email: result.rows[0].Email, firstName: result.rows[0].Name }]);
//                         }
//                         else {
//                             req.flash('danger', "Oops. Incorrect login details.");
//                             console.log('danger', "Oops. Incorrect login details2.");
//                             return done(null, false);
//                         }
//                     });
//                 }
//             }))
//         }

//         catch (e) { throw (e); }
//     };

// }
// ))

// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });		



const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));