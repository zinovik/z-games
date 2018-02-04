const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
require('dotenv').load();
const express = require('express');

app = express();
app.use(helmet());

app.get('*', (req, res, next) => {
  // TODO RegExp
  if ((req.url.indexOf('#') > -1) ||
      ((req.url.lastIndexOf('.') === -1) ||
      (req.url.indexOf('/', req.url.lastIndexOf('.')) > -1))) {
    req.url = `/#${req.url}`;
  }
  next();
});

app.use(express.static(path.join(__dirname, 'platforms/browser/www')));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

const content = 'var process_env = ' + JSON.stringify({
  serverURL: process.env.serverURL || 'http://localhost:3000',
});

fs.writeFile(__dirname + '/platforms/browser/www/process_env.js', content, function(err) {
  if (err) {
    return console.error(err);
  }
});

fs.writeFile(__dirname + '/www/process_env.js', content, function(err) {
  if (err) {
    return console.error(err);
  }
});

fs.unlink(__dirname + '/platforms/browser/www/.gitignore', (err) => {});

app.set('port', process.env.PORT || 8100);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
