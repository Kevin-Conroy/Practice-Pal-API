const express = require("express");
const exerciseRouter = express.Router();
const bodyParser = express.json();
const cookieParser = require("cookie-parser");

exerciseRouter.use(cookieParser())

exerciseRouter.route("/exercises").get((req, res) => {
    res.status(200).send("Here are the user's exercises")
})

exerciseRouter.route("/edittempos").get((req, res) => {
    res.status(200).send("Here is where the user can update their tempos");
  });

  module.exports = exerciseRouter;