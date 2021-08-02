const express = require("express");
const app = express();
const userRouter = require("./user-router");
const exerciseRouter = require("./exercise-router")
const knex = require('knex')
require('dotenv').config()
const { PORT, DB_URL } = require("./config");


const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

const db = knex({
  client: "pg",
  connection: DB_URL,
});

app.set('db', db)

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/api/*", (req, res) => {
  res.json({ ok: true });
});

app.use(userRouter);
app.use(exerciseRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };
