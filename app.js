let express = require('express'), app = express();
let passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

let knex = require('./dbconnection.js').connection(process.argv);

// -------------- passport --------------
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  function(username, password, done) {
    knex('users').where({username: username }).then(function(user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
// -------------- end passport --------------


// -------------- express --------------
// View engine things
app.set('view engine', 'html'); // Set the view engine extension
app.engine('html', require('hbs').__express); // Set the view engine itself

app.get('/', (req, res) => {
	let exampleObject = {title: "Gargoyle"};
	res.render('index', exampleObject); // Rendering example
});

// Routing, index.js doesn't need to be included in the require path because index.js is the default for a directory
let login = require('./routes/login.js'); // Likely use for processing login
app.use('/login', login);

// Other views can follow the format of students/admin
let students = require('./routes/students'); 
app.use('/students', verify, students); // 

let admin = require('./routes/admin');
app.use('/admin', verify, admin);

let help = require('./routes/help');
app.use('/help', help);

// Public directory
app.use(express.static('public'));

app.listen(8080, () => console.log("App listening on port 8080"));

function verify(req, res, next) {
	// TODO: Middleware to verify auth
  console.log(req.user);
  //console.log(req.user.authenticated);
	next();
}

// -------------- end express --------------

// TODO: express-session