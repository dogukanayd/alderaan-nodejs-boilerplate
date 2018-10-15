const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const https = require('https');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go!

// import all of our models
require('./models/User');
require('./models/UserLikes');

// Start our app!
const app = require('./app');


// app.set('port', process.env.PORT || 7777);
// const server = app.listen(app.get('port'), () => {
//   console.log(`Express running → localhost:${server.address().port}`);
// });

const certOptions = {
  key: fs.readFileSync(path.resolve('./build/cert/server.key')),
  cert: fs.readFileSync(path.resolve('./build/cert/server.crt')),
};
/*eslint-disable*/
const server = https.createServer(certOptions, app).listen(443);
