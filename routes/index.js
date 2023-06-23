const express = require("express");
const routes = express.Router();
const usersRoutes = require("./users");
const favoritesRoutes = require("./favorites");

routes.use("/users", usersRoutes);
routes.use("/favorites", favoritesRoutes);

module.exports = routes;
