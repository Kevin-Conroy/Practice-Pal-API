const bcrypt = require("bcrypt");

const UserService = {
  insertUser(knex, newProfile) {
    try {
      const password = bcrypt.hashSync(newProfile.password, 2);
      return knex
        .insert({ id: newProfile.id, username: newProfile.username, password })
        .into("users")
        .returning("*")
        .then((rows) => {
          return rows[0];
        });
    } catch (err) {
      console.log("Caught an error " + err);
    }
  },

  getByUsername(knex, username) {
    return knex.from("users").select("*").where({ username }).first();
  },
};

module.exports = UserService;
