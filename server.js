const express = require("express");
const {
  pool
} = require("./dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
var path = require('path');
require("dotenv").config();
const app = express();
app.use(express.static(__dirname));
const PORT = process.env.PORT || 3000;
const {
  request
} = require("https");
const initializePassport = require("./passportConfig");
var nodemailer = require("nodemailer");
const {
  v4: uuidv4,
  stringify
} = require("uuid");
const { receiveMessageOnPort } = require("worker_threads");
initializePassport(passport);

// Middleware

// Parses details from a form
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.set("view engine", "ejs");


/// mailing info using node mailer
var transporter = nodemailer.createTransport({
  service: "Aol",
  port: 587,
  auth: {
    user: "tree_shop123@aol.com",
    //user: "tree_electronics@zohomail.com",
    pass: "hofeohfniurkqgos",
    //pass: "Db123!@#",
  },
});


app.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET,
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false,
  })
);

// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());
app.use(flash());


//in case /reset-password/:id' is the link where id is an id of the user
app.get('/reset-password/:id', (req, res) => {
  res.render('reset-password.ejs', {
    id: req.params.id   // assign the id to reset-password.ejs see <%= id %> in reset-password.ejs
  });
});

//in case /sign-in is the mail 
app.get("/sign-up", checkAuthenticated, (req, res) => { // check authenticated checks if already signed in if yes moves to dashboard
  res.render("sign-up.ejs");
});

// in case reset-password-request'is the link, it goes to /reset-password-request.ejs.
app.get('/reset-password-request', function (req, res) { 
  res.render("reset-password-request.ejs");
})

//in case /sign=in is the link, it moves to sign-in.ejs (page)
app.get("/sign-in", checkAuthenticated, (req, res) => {// checks if already signed in i yes it moves to dashboard

  res.render("sign-in.ejs");
});

// in case /dashboard is the given link, moves to dashboard.ejs page
app.get("/dashboard", checkNotAuthenticated, (req, res) => { // checks if account is not signed in, if not moves to sign-in page else continues
  res.render("dashboard.ejs", {
    user: req.user.Name,   // can be changed to req.user.ID or nothing
  });
});

//in case /buy-pc is the link, moves to /buy-pc page
app.get("/buy-pc", checkNotAuthenticated, (req, res) => { //  // checks if account is not signed in, if not moves to sign-in page else continues
  res.render("buy-pc.ejs", {
    user: req.body.email,
  });
});

//in case /buy-cell phone is the link, moves to buy-cell-phone page
app.get("/buy-cell-phone", checkNotAuthenticated, (req, res) => {// checks if account is not signed in, if not moves to sign-in page else continues
  console.log(req.isAuthenticated());
  res.render("buy-cell-phone.ejs", {
    user: req.body.email,
  });
});

//in case/ contact-us-page is the link, moves to contat us page
app.get("/contact-us-page", (req, res) => {
  res.render("contact-us-page.ejs", {
  });
});

//in case/profile-details is the page moves to profile-details
app.get("/profile-details", checkNotAuthenticated, (req, res) => {// checks if account is not signed in, if not moves to sign-in page else continues
  res.render("profile-details.ejs", {
    id: req.user.ID,
    name: req.user.Name,
    lastName: req.user.FamilyName,
    email: req.user.Email,
    phone: req.user.PhoneNumber,
    country: req.user.Country,
    city: req.user.City,
    street: req.user.Street,
    zip: req.user.ZipCode
  });
});

//in case /verify/:userId/:unique String" this is vericication link where userid is the id of the user and uniqueString is a unique generated string for verification puropose
app.get("/verify/:userId/:uniqueString", (req, res) => {
  const {
    userId,
    uniqueString
  } = req.params; // takes userid and unique id from the parameters of the link

  pool.query(   // first query to get "id" and "Spare2" (used to hold unique string) of an account with given userid
    `SELECT "ID", "Spare2" FROM public."Users" WHERE "ID"=${userId}`,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results.rows.length > 0) { // if an account with userid was found

        bcrypt
          .compare(uniqueString, results.rows[0].Spare2)    //compare unique string from link to unique string of user in database
          .then((result) => {
            if (result) {// if comparison is correct
              pool.query(
                `UPDATE "Users" SET "Spare1" = \'true\' WHERE "ID"=${userId};`,// change "Spare1" (verified or not) to true 
                (err, results) => {
                  if (err) {
                    console.log(err);
                  }
                  req.flash("success_msg", "User was activated please log in.");    // message to display in sign-in page
                  res.redirect("/sign-in"); //moves to sign in page
                }

              )
            } else{
                    // otherwise ( user not found  user is moved to sign-up page)
                  req.flash("error", "link is not valid please sign-up");
                  res.redirect("/sign-up");
            }
          });
      }else{
        req.flash("error", "user not found please sign up");
        res.redirect("/sign-up");
      } 

    }
  )
});

//logout
app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session = null;
    res.redirect('/sign-in');
  });
});

//in case /resetPassword/:userId/:uniqueString' is the called link we handle reset Password request(link that was sent to user), where userid is the id of user with uniqueString
app.get('/resetPassword/:userId/:uniqueString', (req, res) => {
  const {
    userId,
    uniqueString
  } = req.params;// take userId and uniqueString from link parameters
  pool.query(
    `SELECT "ID", "Spare2" FROM public."Users" WHERE "ID"=${userId}`, // first query to get "id" and "Spare2" (used to hold unique string) of an account with given userid
    (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results.rows.length > 0) { // if a user was found with given id
        bcrypt
          .compare(uniqueString, results.rows[0].Spare2)// compare uniqueString from link parameters to uniqueString from account (Spare2)
          .then((result) => {// if comparison is correct 
            if (result) {

                req.flash("success_msg", "User was activated please log in."); // message to be displayed in reset-password page
              res.redirect(`/reset-password/${userId}`);//move to reset-password page with userid as a parameter in link
              

            }else{
            // if no user found or unique id do no match move to sign up page
            req.flash("error", "invalid link please reset again"); //message to be displayed in sign-up page
            res.redirect("/reset-password-request"); //moves to sign up-page
            }

            
          })
      }else{
            // if no user found or unique id do no match move to sign up page
            req.flash("error", "user not found please sign up"); //message to be displayed in sign-up page
            res.redirect("/sign-up"); //moves to sign up-page
      }
    })
})
app.post("/profile-details/:id", checkNotAuthenticated, (req, res) => {// checks if account is not signed in, if not moves to sign-in page else continues


    // name: req.user.Name,
    // lastName: req.user.FamilyName,
    // email: req.user.Email,
    // phone: req.user.PhoneNumber,
    // country: req.user.Country,
    // city: req.user.City,
    // street: req.user.Street,
    // zip: req.user.ZipCode

  const userId = req.params.id;
  var {
    name,
    lastName,
    phone,
    country,
    city,
    street,
    zip
  } = req.body;
  console.log(req.user)
  console.log(req.body)
  console.log(req.params)
  name==''?req.user.Name : name
  lastName==''?req.user.FamilyName : lastName
  phone==''?req.user.PhoneNumber : phone
  country==''?req.user.Country : country
  city==''?req.user.City : city
  street==''?req.user.Street : street
  zip==''?req.user.ZipCode : zip
  zip.trimStart()
  phone.trimStart()
  country.trimStart()
  console.log(phone.trimStart())
  req.user={name,lastName,phone,country,city,street,zip}
  console.log(req.user)
  pool.query(
    `UPDATE "Users" SET "Name" = '${name}', "FamilyName" = '${lastName}', "PhoneNumber" = '${phone}', "Country" = 'port', "City" = '${city}', "Street" = '${street}', "ZipCode" = '${zip}' WHERE "ID"=${userId};`, // query to update password of a user
    (err, results) => {
      if (err) {    // if error in case of update password update failed, not handeled yet
        console.log(err);
      }
    }
  )

});
// in case a post is sent for /reset-password/:id  where id is the id of a user.
app.post('/reset-password/:id', (req, res) => {
  const {
    password
  } = req.body;// takes password from reset password page. no need for confirm password confirm password check is done in html
  const userId = req.params.id;//takes user id from parameter id in the given link

  bcrypt.hash(password, 10, (err, hash) => {// hashes password using bycrpt
    if (err) throw err;
    pool.query(
        `UPDATE "Users" SET "Password" = '${hash}' WHERE "ID"=${userId};`, // query to update password of a user
        (err, results) => {
          if (err) {    // if error in case of update password update failed, not handeled yet
            console.log(err);
          }
        }
        
      )
        req.flash(  //message to be displayed in sign-in page
          "success_msg",
          "Password was changed, please login."
        );
        res.redirect('/sign-in');   //moves to sign-in page

  });
})
//if contact us was submited
app.post("/contact-us-page", (req, res) => {

    //collecting data from EJS file post
    let { 
        name,
        email,
        subject,
        msgfield, //not used validation is done on html page
      } =
      req.body;
      
    //sending mail to itself
    var mailOptions = { 
        from: "tree_shop123@aol.com",
        to:  "tree_shop123@aol.com", //
        subject: subject+" by ",
        text: "message from:\nemail: "+email+ "\nname: " +name+"\nmessage:" + msgfield,
      };
      
      transporter
        .sendMail(mailOptions) //sends mail
        // send a copy to user
        var mailOptions = { 
            from: "tree_shop123@aol.com",
            to:  email, //
            subject: "copy of "+ subject+" by ",
            text: "Thank you for your email\n we will contact you as soon as possible here is your message:\n" + msgfield+"\n\n\nBestregards\nTree-Electronics\nSupport",
          };
          
          transporter
            .sendMail(mailOptions) //sends mail

    res.render("contact-us-page.ejs")
  });

//in case a post was sent as /sign up
app.post("/sign-up", async (req, res) => { //in case 
  let { 
    name,
    lastName,
    email,
    password,
    passwordConfirm, //not used validation is done on html page
    promoCode
  } =
  req.body; // parameters server gets from /sign-up when submit is pressed, (once submit is clicked all inputs from page go to req.body.
// all string validations are done on html ()
  


 hashedPassword = await bcrypt.hash(password, 10); // hash password using bcrypt

    try {
      pool.query(
        'SELECT "ID", "Name", "Email", "Password" FROM public."Users" WHERE "Email"=$1',    //this is used to check if email is already in use
        [email],
        (err, results) => {
          if (err) {
            console.log(err);
          }
          if (results.rows.length > 0) {    // if account with this email is found
            return res.render("sign-up", {  // we return to sign-ip
              message: "Email already registered",  //with message
            });
          } else {  // if no accounts were found
            pool.query(
              'SELECT case when(MAX("ID") is null) then 0 else MAX("ID")+1 end maximum from public."Users"',    // id is created for the user ( depending on number of user already registered)
              (err, results) => {
                if (err) {
                  throw err;
                }

                var id = results.rows[0].maximum;   // id is taken from result, column "maximum"
                console.log(id)
                const uniqueString = uuidv4() + id; // generate unique id using uudv4 and combine it with user id
                bcrypt.hash(uniqueString, 10, (err, hashedUniqueID) => {    //hash uniqueString
                  console.log(hashedUniqueID)
                  try {
                    pool.query(// query to add new user with available information + "Spare1" as false to (used to verify, if true means account is verified) and uniqueString to "Spare2" (used to verify) 
                      `INSERT INTO public."Users" ("ID", "Name", "FamilyName","Email","Password","PromoCode","Spare1","Spare2") Values ( ${id} ,'${name}','${lastName}','${email}','${hashedPassword}','${promoCode}','false','${hashedUniqueID}');`,
                      (err, results) => {
                        if (err) {
                          throw err;
                        }
                        const currentUrl = "http://localhost:3000/";    // need to be changed to heroku once deployed
                        //mailing information 
                        var mailOptions = { 
                          from: "tree_shop123@aol.com",
                          to: email,
                          subject: "Tree-Electronics please verify your email",
                          html: `<p> Verify your email address to complete the signup and login into your accout.</p>
                      <p>Press <a href=${
                        currentUrl + "verify/" + id + "/" + uniqueString
                      }>here</a> to proceed.</p>`,
                        };

                        transporter
                          .sendMail(mailOptions) //sends mail
                          .then(() => {
                            // email sent and verification record saved
                            req.flash(
                              "success_msg",
                              "An activation link was sent to your mail."   //message to be displayed on sign in oage
                            );
                            res.redirect("/sign-in");   // move to sing-in page
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }
                    );
                  } catch (err) {
                    console.log(err);
                  }
                });
              }
            );
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
);
// in case a post was sent to /reset-password-request
app.post('/reset-password-request', function (req, res) {   

  const currentUrl = "http://localhost:3000/";  // need to be changed to heraku once deployed
  pool.query(
    `SELECT "ID", "Spare2" FROM public."Users" WHERE "Email"='${req.body.email}'`,  // get ID and Spare2 (uniqueString) of given email
    (err, results) => {
      if (err) {
        console.log(err);
      }


        if (results.rows.length > 0) {
            bcrypt.hash(uniqueString, 10, (err, hashedUniqueID) => {
            var userID = results.rows[0].ID   //saves user id from db to variable
            const uniqueString = uuidv4() + userID;   //create uniqueString using uuvid + userID
          pool.query(
            `UPDATE "Users" SET "Spare2" = '${hashedUniqueID}' WHERE "ID"=${userID};`,  // add UniqueString to user in "Spare2"
            (err, results) => {
              if (err) {
                console.log(err);
              }
              //mailing information + link creating for password reset
              var mailOptions = {
                from: "tree_shop123@aol.com",
                to: req.body.email,
                subject: 'Reset Your Password',
                html: `<p> Pleaes press the link to reset your password.</p><p>
              </p><p>Press <a href=${
                  currentUrl + 'resetPassword/' + userID + '/' + uniqueString
              }>here</a> to proceed.</p>`
              };
              transporter
                .sendMail(mailOptions) //sends mail
            }
          )
        })
      }
      res.redirect("/sign-in");// redirects to sign-in
    })
})
// in case a post was sent to sign-in
app.post(
  "/sign-in",
  function (req, res, next) {
      // recaptcha checking
    // if (
    //   req.body["g-recaptcha-response"] === undefined ||
    //   req.body["g-recaptcha-response"] === "" ||
    //   req.body["g-recaptcha-response"] === null
    // ) {
    //   return res.json({
    //     responseCode: 1,
    //     responseDesc: "Please select captcha",
    //   });
    // }
    // var secretKey = "6LebMGkgAAAAALx7k1QSWAsYZA9g7Wm9sFcDJyMA";
    // var verificationURL =
    //   "https://www.google.com/recaptcha/api/siteverify?secret=" +
    //   secretKey +
    //   "&response=" +
    //   req.body["g-recaptcha-response"] +
    //   "&remoteip" +
    //   req.socket.remoteAddress;
    // request(verificationURL, function (error, response, body) {
    //   body = JSON.parse(body);
    //   if (body.success !== undefined && !body.success) {
    //     return res.json({
    //       responseError: "Failed captcha verification",
    //     });
    //   }
    // });
    // end of recaptcha checking


    return next();
  },
  // user authenitcate redirects accordingly
  passport.authenticate("local", {
     failureRedirect: "/sign-in",
    failureFlash: true,
  }), function(req, res) {
    if (req.body.rememberMe) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
    } else {
      req.session.cookie.expires = false; // Cookie expires at end of session
    }
    res.redirect( "/dashboard")}

);

function checkAuthenticated(req, res, next) {//  if user is logged in moves to dashboard else continue
  if (req.isAuthenticated()) { // if yes it moves to dashboard
    return res.redirect("/dashboard");
  }
  next();// otherwise continues 
}

function checkNotAuthenticated(req, res, next) { //  if user is not logged in moves to sign in else continue
  if (req.isAuthenticated()) {
    return next();  // if logged in continues
  }
  res.redirect("/sign-in"); //else moves to sign- in
}

app.listen(PORT);
console.log('Server started! At http://localhost:' + PORT + '/sign-in');