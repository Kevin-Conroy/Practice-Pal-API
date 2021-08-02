const UserService = {
  insertUser(knex, newProfile) {
    return knex
      .insert(newProfile)
      .into("users")
      .returning("*")
      .then((rows) => rows[0]);
  },
};

module.exports = UserService;
