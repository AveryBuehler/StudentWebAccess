/*
// HTTPS setup
let fs = require('fs');
let http = require('http');
let https = require('https');
let privateKey = fs.readFileSync('certs/server.key', 'utf8'); // TODO: Generate certs
let certificate = fs.readFileSync('certs/server.crt', 'utf8');
const credentials = {
	key: privateKey, 
	cert: certificate
};
*/

let express = require('express');
let app = express();

app.use(express.static('public'));

app.post('/login', (req, res) => {
	// TODO: Process login
	res.send('debugtime');
})

// Routing, index.js doesn't need to be included in the require path because index.js is the default for a directory
let login = require('./login.js'); // Likely use for processing login
app.use('/login', login);

// Other views can follow the format of students/admin
let students = require('./routes/students'); 
app.use('/students', students);

let admin = require('./routes/admin');
app.use('/admin', admin);

let help = require('./routes/help');
app.use('/help', help);


/*
// HTTPS things
let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);
httpServer.listen(80);
httpsServer.listen(443);
*/

app.listen(80, () => console.log("App listening on port 80"));

// TODO: Add passport.js, express-session