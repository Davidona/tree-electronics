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


const express = require("express");
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
require("dotenv").config();
const app = express();
app.use(express.static(__dirname));
const PORT = process.env.PORT || 3000;

const initializePassport = require("./passportConfig");

initializePassport(passport);

// Middleware

// Parses details from a form
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET,
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false
  })
);
// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());
app.use(flash());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users/sign-up", checkAuthenticated, (req, res) => {
  res.render("sign-up.ejs");
});

app.get("/users/sign-in", checkAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
 // console.log(req.session.flash.error);
  res.render("sign-in.ejs");
});

app.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("dashboard", { user: req.user.name });
});

app.get("/users/logout", (req, res) => {
  req.logout();
  res.render("index", { message: "You have logged out successfully" });
});

app.post("/users/sign-up", async (req, res) => {
  let { name, email, password, password2 } = req.body;

  let errors = [];

  console.log({
    name,
    email,
    password,
    password2
  });

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("sign-up", { errors, name, email, password, password2 });
  } else {
    hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Validation passed
    pool.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          return res.render("sign-up", {
            message: "Email already registered"
          });
        } else {
          pool.query(
            `INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3)
                RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              req.flash("success_msg", "You are now registered. Please log in");
              res.redirect("/users/sign-in");
            }
          );
        }
      }
    );
  }
});

app.post(
  "/users/sign-in",
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/sign-in",
    failureFlash: true
  })
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/sign-in");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});