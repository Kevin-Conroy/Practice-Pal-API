const express = require("express");
const userRouter = express.Router();
const bodyParser = express.json();
const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("./config");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const UserService = require("./user-service");
const ExerciseService = require("./exercise-service");

userRouter.use(cookieParser());

const serializeUser = (user) => ({
  id: user.id,
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
      const token = jwt.sign({ userId: user.id }, JWTSECRET);
      res
        .status(201)
        .location(`/user`)
        //.json({...serializeUser(user) });
        .json({ ...serializeUser(user), token });
    })
    .catch(next);
});

userRouter.route("/login").post(bodyParser, (req, res, next) => {
  const { username, password } = req.body;
  UserService.getByUsername(req.app.get("db"), username)
    .then((user) => {
      
      if (!user) {
        return res.send({ successfulLogin: false, field: "username" });
      }
      const passwordsMatch = bcrypt.compareSync(password, user.password);
      if (!passwordsMatch) {
        return res.send({ successfulLogin: false, field: "password" });
      }
      return ExerciseService.getMyExercises(req.app.get("db"), user.id).then(
        (exercises) => {
          const token = jwt.sign({ userId: user.id }, JWTSECRET);
          return res.send({
            exercises,
            successfulLogin: true,
            userId: user.id,
            token,
          });
        }
      );

      //tres.send({  });
    })
    .catch((error) => {
      return next(error);
    });
});

module.exports = userRouter;
