const { Sequelize } = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class Users extends Sequelize.Model {
  validatePassword(plainPassword) {
    return bcrypt
      .hash(plainPassword, this.salt)
      .then((hash) => hash === this.password);
  }

  hash(plainPassword, salt) {
    return bcrypt.hash(plainPassword, salt).then((hash) => hash);
  }
}
Users.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    salt: {
      type: Sequelize.STRING,
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },

  { sequelize: db, modelName: "users" }
);

Users.addHook("beforeCreate", (user) => {
  user.salt = bcrypt.genSaltSync();
  return user
    .hash(user.password, user.salt)
    .then((hash) => (user.password = hash));
});

module.exports = Users;
