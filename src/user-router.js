const express = require("express");
const userRouter = express.Router();
const bodyParser = express.json();
const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("./config");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const UserService = require("./user-service");

userRouter.use(cookieParser());

const serializeUser = (user) => ({
  //id: user.id,
  username: user.username,
  password: user.password,
});

userRouter.route("/user").post(bodyParser, (req, res, next) => {
  //const newUser = { username, password };
  for (const field of ["username", "password"]) {
    if (!req.body[field]) {
      return res.status(400).send({
        error: { message: `'${field}' is required` },
      });
    }
  }
  const newProfile = {
    username: req.body.username,
    password: req.body.password,
  };
  UserService.insertUser(req.app.get("db"), newProfile)
    .then((user) => {
      //const token = jwt.sign({ userId: profile.id }, JWTSECRET);
      res
        .status(201)
        .location(`/user`)
        .json({ ...serializeUser(user) });
      //.json({...serializeProfile(profile), token});
    })
    .catch(next);
});

userRouter.route("/login").get((req, res) => {
  res.status(200).send("Here is the login page");
});

module.exports = userRouter;
