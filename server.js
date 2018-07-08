const fs = require('fs');
require('dotenv').load();
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

const configVars = 'var configVars = ' + JSON.stringify({
  SERVER_URL: process.env.SERVER_URL,
}) + ';\n';

fs.mkdir(`${__dirname}/dist/assets/`, (err) => {
  if (err && err.code !== 'EEXIST') {
    return console.error('Error creating assets directory', err);
  }
  fs.writeFile(`${__dirname}/dist/assets/config_vars.js`, configVars, (err) => {
    if (err) {
      return console.error('Error creating config_vars.js', err);
    }
  });
});

fs.writeFile(`${__dirname}/src/assets/config_vars.js`, configVars, (err) => {
  if (err) {
    return console.error('Error creating config_vars.js', err);
  }
});

app.listen(process.env.PORT || 8080);
