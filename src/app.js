const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const { connect } = require('mongoose');
const { DATABASE_URL } = require('./config/environments/environment');

class App {
  constructor() {
    this.server = express();
    this.midlewares();
    this.routes();
    this.database();
  }

  midlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }

  database() {
    connect(
      DATABASE_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      error => {
        const message = error ? `Error ${error}` : 'MongoDB connected';
        console.log(message);
      }
    );
  }
}

module.exports = new App().server;
