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

const serializeExercise = (exercise) => ({
  id: exercise.id,
  userId: exercise.user_id,
  name: exercise.name,
  currentTempo: exercise.current_tempo,
  goalTempo: exercise.goal_tempo,
});

userRouter.route("/user").post(bodyParser, (req, res, next) => {
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

        .json({ ...serializeUser(user), token });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
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
            successfulLogin: true,
            userId: user.id,
            token,
            exercises: exercises.map(serializeExercise),
          });
        }
      );
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = userRouter;
