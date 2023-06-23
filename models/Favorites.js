const { Sequelize } = require("sequelize");
const db = require("../db");

class Favorites extends Sequelize.Model {}

Favorites.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    URLimage: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db, // Conexión a la instancia de Sequelize (db)
    modelName: "favorites", // Nombre del modelo
  }
);

module.exports = Favorites;
