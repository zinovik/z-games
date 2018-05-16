const fs = require('fs');
require('dotenv').load();
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

const configVars = 'var configVars = ' + JSON.stringify({
  serverURL: process.env.serverURL,
}) + ';\n';

fs.writeFile(`${__dirname}/dist/assets/config_vars.js`, configVars, (err) => {
  if (err) {
    return console.error('Error creating config_vars.js', err);
  }
});

fs.writeFile(`${__dirname}/src/assets/config_vars.js`, configVars, (err) => {
  if (err) {
    return console.error('Error creating config_vars.js', err);
  }
});

app.listen(process.env.PORT || 8080);
