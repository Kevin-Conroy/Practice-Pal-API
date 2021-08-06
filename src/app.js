require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require('./config');
const userRouter = require("./user-router");
const exerciseRouter = require("./exercise-router");
const knex = require('knex');
const app = express();
const {CLIENT_ORIGIN, PORT, DATABASE_URL} = require('./config');


app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

 const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(userRouter);
app.use(exerciseRouter);
app.use(express.json());

const knexInstance = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
});

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.set('db', db)

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});
app.use(userRouter);
app.use(exerciseRouter);

module.exports = app;