const ExerciseService = {
  insertExercise(knex, newExercise) {
    console.log("line 3 in API" + newExercise);
    return knex
      .insert({
        user_id: newExercise.userId,

        name: newExercise.name,
        current_tempo: newExercise.currentTempo,
        goal_tempo: newExercise.goalTempo,
      })
      .into("exercises")
      .returning("*")
      .then((rows) => rows[0]);
  },
  updateExercise(knex, id, exerciseToUpdate) {
    console.log(exerciseToUpdate);
    return knex("exercises")
      .where({ id })
      .update({
        id: exerciseToUpdate.id,
        current_tempo: exerciseToUpdate.current_tempo,
        goal_tempo: exerciseToUpdate.goal_tempo,
      })
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  getMyExercises(knex, user_id) {
    return knex.from("exercises").select("*").where("user_id", user_id);
  },
};

module.exports = ExerciseService;
