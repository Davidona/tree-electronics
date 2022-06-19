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
initializePassport(passport);

// Middleware

// Parses details from a form
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.set("view engine", "ejs");
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

app.get('/reset-password/:id', (req, res) => {
  res.render('reset-password.ejs', {
    id: req.params.id
  });
});

app.get("/sign-up", checkAuthenticated, (req, res) => {
  res.render("sign-up.ejs");
});
app.get('/reset-password-request', function (req, res) {
  res.render("reset-password-request.ejs");
})

app.get("/sign-in", checkAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
  // console.log(req.session.flash.error);
  res.render("sign-in.ejs");
});

app.get("/dashboard", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("dashboard.ejs", {
    user: req.body.email,
  });
});

app.get("/buy-pc", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("buy-pc.ejs", {
    user: req.body.email,
  });
});

app.get("/buy-cell-phone", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("buy-cell-phone.ejs", {
    user: req.body.email,
  });
});

app.get("/contact-us-page", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("contact-us-page.ejs", {
    user: req.body.email,
  });
});

app.get("/profile-details", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("profile-details.ejs", {
    user: req.body.email,
  });
});


app.get("/verify/:userId/:uniqueString", (req, res) => {
  const {
    userId,
    uniqueString
  } = req.params;

  pool.query(
    `SELECT "ID", "Spare2" FROM public."Users" WHERE "ID"=${userId}`,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results.rows.length > 0) {

        bcrypt
          .compare(uniqueString, results.rows[0].Spare2)
          .then((result) => {
            if (result) {
              pool.query(
                `UPDATE "Users" SET "Spare1" = \'true\' WHERE "ID"=${userId};`,
                (err, results) => {
                  if (err) {
                    console.log(err);
                  }
                  req.flash("success_msg", "User was activated please log in.");
                  res.redirect("/sign-in");
                }

              )
            }
          });
      } else {
        req.flash("success_msg", "user not found please sign up");
        res.redirect("/sign-up");
      }
    }
  )
});



app.get("/logout", (req, res) => {
  req.logout();
  res.render("/sign-in", {
    message: "You have logged out successfully",
  });
});


app.get('/resetPassword/:userId/:uniqueString', (req, res) => {
  const {
    userId,
    uniqueString
  } = req.params;
  pool.query(
    `SELECT "ID", "Spare2" FROM public."Users" WHERE "ID"=${userId}`,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results.rows.length > 0) {
        bcrypt
          .compare(uniqueString, results.rows[0].Spare2)
          .then((result) => {
            if (result) {

              res.redirect(`/reset-password/${userId}`);
              req.flash("success_msg", "User was activated please log in.");

            } else {
              req.flash("success_msg", "user not found please sign up");
              res.redirect("/sign-up");
            }
          })
      }
    })
})

app.post('/reset-password/:id', (req, res) => {
  const {
    password
  } = req.body;
  const userId = req.params.id;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    // Set password to hashed
    pool.query(
        `UPDATE "Users" SET "Password" = '${hash}' WHERE "ID"=${userId};`,
        (err, results) => {
          if (err) {
            console.log(err);
          }
        }
        
      )
        req.flash(
          "success_msg",
          "Password was changed, please login."
        );
        res.redirect('/sign-in');

  });
})
app.post("/sign-up", async (req, res) => {
  let {
    name,
    lastName,
    email,
    password,
    passwordConfirm,
    promoCode
  } =
  req.body;

  let errors = [];

  console.log({
    name,
    email,
    password,
  });

  if (errors.length > 0) {
    res.render("sign-up", {
      errors,
      name,
      email,
      password,
      passwordConfirm,
      promoCode,
    });
  } else {
    hashedPassword = await bcrypt.hash(password, 10);

    // Validation passed
    try {
      pool.query(
        'SELECT "ID", "Name", "Email", "Password" FROM public."Users" WHERE "Email"=$1',
        [email],
        (err, results) => {
          if (err) {
            console.log(err);
          }
          if (results.rows.length > 0) {
            return res.render("sign-up", {
              message: "Email already registered",
            });
          } else {
            pool.query(
              'SELECT case when(MAX("ID") is null) then 0 else MAX("ID")+1 end maximum from public."Users"',
              (err, results) => {
                if (err) {
                  throw err;
                }

                var id = results.rows[0].maximum + 1;
                console.log(id)
                const uniqueString = uuidv4() + id;
                bcrypt.hash(uniqueString, 10, (err, hashedUniqueID) => {
                  console.log(hashedUniqueID)
                  try {
                    pool.query(
                      `INSERT INTO public."Users" ("ID", "Name", "FamilyName","Email","Password","PromoCode","Spare1","Spare2") Values ( ${id} ,'${name}','${lastName}','${email}','${hashedPassword}','${promoCode}','false','${hashedUniqueID}');`,
                      (err, results) => {
                        if (err) {
                          throw err;
                        }
                        const currentUrl = "http://localhost:3000/";
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
                          .sendMail(mailOptions)
                          .then(() => {
                            // email sent and verification record saved
                            req.flash(
                              "success_msg",
                              "An activation link was sent to your mail."
                            );
                            res.redirect("/sign-in");
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
});
app.post('/reset-password-request', function (req, res) {

  const currentUrl = "http://localhost:3000/";
  pool.query(
    `SELECT "ID", "Spare2" FROM public."Users" WHERE "Email"='${req.body.email}'`,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      var userID = results.rows[0].ID
      const uniqueString = uuidv4() + userID;
      bcrypt.hash(uniqueString, 10, (err, hashedUniqueID) => {
        if (results.rows.length > 0) {
          pool.query(
            `UPDATE "Users" SET "Spare2" = '${hashedUniqueID}' WHERE "ID"=${userID};`,
            (err, results) => {
              if (err) {
                console.log(err);
              }

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
                .sendMail(mailOptions)
            }
          )
        }
      })
      res.redirect("/sign-in");
    })
})

app.post(
  "/sign-in",
  function (req, res, next) {
    if (
      req.body["g-recaptcha-response"] === undefined ||
      req.body["g-recaptcha-response"] === "" ||
      req.body["g-recaptcha-response"] === null
    ) {
      return res.json({
        responseCode: 1,
        responseDesc: "Please select captcha",
      });
    }
    var secretKey = "6LebMGkgAAAAALx7k1QSWAsYZA9g7Wm9sFcDJyMA";
    var verificationURL =
      "https://www.google.com/recaptcha/api/siteverify?secret=" +
      secretKey +
      "&response=" +
      req.body["g-recaptcha-response"] +
      "&remoteip" +
      req.socket.remoteAddress;
    request(verificationURL, function (error, response, body) {
      body = JSON.parse(body);
      if (body.success !== undefined && !body.success) {
        return res.json({
          responseError: "Failed captcha verification",
        });
      }
    });

    return next();
  },
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/sign-in",
    failureFlash: true,
  })
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/sign-in");
}

app.listen(PORT);
console.log('Server started! At http://localhost:' + PORT + '/sign-in');