const http = require('http');
const express = require('express');
const morgan = require('morgan');
const webServerConfig = require('../config/web-server.js');
const router = require('./router.js');
const cors = require('cors')
const bodyParser = require('body-parser');

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);

    // Combines logging info from request and response
    app.use(morgan('combined'));

    //used for enabling CORS when client calls server
    app.use(cors());

    app.options('*', cors());  // enable pre-flight
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: true }));

    // Mount the router at /api so all its routes start with /api
    app.use('/api', router);

    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);

        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

module.exports.initialize = initialize;

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;
