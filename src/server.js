const express = require("express");
const app = require("./app");
const userRouter = require("./user-router");
const exerciseRouter = require("./exercise-router")
const knex = require('knex')
require('dotenv').config()
const { PORT } = require("./config");

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/api/*", (req, res) => {
  res.json({ ok: true });
});



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };
