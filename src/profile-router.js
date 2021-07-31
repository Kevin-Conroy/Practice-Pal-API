const express = require("express");
const profileRouter = express.Router();
const bodyParser = express.json();
const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("./config");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

profileRouter.use(cookieParser())

profileRouter.route("/login").get((req, res) => {
    res.status(200).send("Here is the login page")
})

profileRouter.route("/profile").get((req, res) => {
    res.status(200).send("Here is the logged in user");
  });

  module.exports = profileRouter;