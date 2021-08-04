const express = require("express");
const exerciseRouter = express.Router();
const bodyParser = express.json();
const cookieParser = require("cookie-parser");
const ExerciseService = require("./exercise-service");
//exerciseRouter.use(cookieParser());

const serializeExercise = (exercise) => ({
  id: exercise.id,
  userId: exercise.user_id,
  name: exercise.name,
  currentTempo: exercise.current_tempo,
  goalTempo: exercise.goal_tempo,
});

exerciseRouter.route("/exercises/").post(bodyParser, (req, res, next) => {
  console.log(req.body);
  for (const field of ["currentTempo", "goalTempo"]) {
    if (!req.body[field]) {
      return res.status(400).send({
        error: { message: `'${field}' is required` },
      });
    }
  }
  const newExercise = {
    userId: req.body.userId,
    name: req.body.name,
    currentTempo: req.body.currentTempo,
    goalTempo: req.body.goalTempo,
  };
  ExerciseService.insertExercise(req.app.get("db"), newExercise)
    .then((exercise) => {
      res
        .status(201)
        .location(`/exercises/`)
        .json({ ...serializeExercise(exercise) });
    })
    .catch(next);
});

exerciseRouter.route("/exercises/:user_id").get((req, res, next) => {
  const { user_id } = req.params;
  ExerciseService.getMyExercises(req.app.get("db"), user_id)
    .then((exercises) => {
      res.json(exercises.map(serializeExercise));
    })
    .catch(next);
});

exerciseRouter.route("/edittempos/:id").patch(bodyParser, (req, res, next) => {
  const exerciseToUpdate = {
    id: req.params.id,
    current_tempo: req.body.currentTempo,
    goal_tempo: req.body.goalTempo,
  };
  const { currentTempo, goalTempo } = req.body;
  if (!currentTempo && !goalTempo) {
    return res.status(400).json({
      error: {
        message: `Please update current or goal tempo`,
      },
    });
  }
  ExerciseService.updateExercise(
    req.app.get("db"),
    req.params.id,
    exerciseToUpdate
  ).then((exercise) => {
    res.send(serializeExercise(exercise)).status(204).end();
  });
});

module.exports = exerciseRouter;
