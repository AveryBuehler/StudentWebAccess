const express = require('express'), 
      app = express(),
      passport = require('passport'), 
      LocalStrategy = require('passport-local').Strategy,
      session = require("express-session"),
      bodyParser = require("body-parser"),
      cookieParser = require("cookie-parser");

let knex = require('./dbconnection.js').connection(process.argv);


//app.use(cookieParser("doggos"));
app.use(session({ secret: "doggos", saveUninitialized: true, resave: false, cookie: { maxAge: null } }));
app.use(bodyParser.urlencoded({ extended: false }));

// -------------- passport --------------
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  function(username, password, done) {
    knex('users.student').where({username: username }).first()
      .then(function(user) {
      //if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(password === user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.student_id);
});

passport.deserializeUser(function(id, done) {
  knex('users.student')
    .where({student_id: id}).first()
    .then(function(user) {
      done(null, user);
  }).catch((err) => { 
    done(err,null); 
  });
});
// -------------- end passport --------------


// -------------- express --------------
// View engine things
app.set('view engine', 'html'); // Set the view engine extension
app.engine('html', require('hbs').__express); // Set the view engine itself

app.get('/', (req, res) => {
	res.render('Login/index', {title: "Gargoyle"}); // Rendering example
});

// Routing, index.js doesn't need to be included in the require path because index.js is the default for a directory
let login = require('./routes/login.js'); // Likely use for processing login
app.use('/login', login);

// Other views can follow the format of students/admin
let students = require('./routes/students'); 
app.use('/students', verify, students); 

let admin = require('./routes/admin');
app.use('/admin', verify, admin);

let help = require('./routes/help');
app.use('/help', help);

// Logout handler
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Public directory
app.use(express.static('public'));

// 404
app.get('*', function(req, res, next) {
  let err = new Error('Page Not Found');
  err.statusCode = 404;
  res.render('error', {error: err})
});

app.listen(8080, () => console.log("App listening on port 8080"));

function verify(req, res, next) {
  // TODO: Middleware to verify auth
  console.log("User nav request from " + req.ip + " for " + req.url);
  if(!req.user) { 
    console.log("No user in request");
    return res.redirect('/');
  }
  next();
}

// -------------- end express --------------
