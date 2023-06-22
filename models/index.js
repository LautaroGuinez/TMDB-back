const Favorites = require("./Favorites");
const Users = require("./Users");
Favorites.belongsTo(Users, { as: "author" });
module.exports = { Favorites, Users };