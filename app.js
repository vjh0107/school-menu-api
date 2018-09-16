'use strict';
const express = require('express');
const process = require('process');
const mongoose = require('mongoose');
const os = require('os');
const fs = require('fs');
const app = express();

console.log(process.env.NODE_ENV);

let port;
os.type() === 'Darwin' ? port = 8080 : port = process.env.PORT || 80
app.listen(port, () => {
  if (process.env.NODE_ENV != 'production') {
    console.log(`http://localhost:${port}`);
  }
});

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to mongod');
});

mongoose.connect('mongodb://localhost/schoolmenu');

app.get('*', (req, res, next) => {
  if ((req.get('X-Forwarded-Proto') === 'http') && (process.env.NODE_ENV == 'production')) {
    res.redirect(`https://${req.get('host')}${req.url}`);
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.redirect('https://github.com/5d-jh/school-menu-api');
});

app.use('/api', require('./api/route'));