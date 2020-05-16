import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import { connect } from 'mongoose';
import { DATABASE_URL } from './config/environments/environment';

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

export default new App().server;
