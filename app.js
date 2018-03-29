let express = require('express');
let app = express();

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
	next();
}

// TODO: Add passport.js, express-session