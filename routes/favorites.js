const express = require("express");
const routes = express.Router();
const db = require("../db");
const { Favorites, Users } = require("../models");

routes.post("/", (req, res) => {
  const { email } = req.body;
  Users.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (!user) {
      console.log("Usuario no encontrado");
      res.sendStatus(404);
      return;
    }

    Favorites.findAll({
      where: {
        authorId: user.id,
      },
    }).then((movies) => {
      if (!movies || movies.length === 0) {
        console.log("No se encontraron películas favoritas");
        res.send([]);
        return;
      }

      console.log(movies);
      res.status(200).json(movies);
    });
  });
});
routes.post("/create-favorites", (req, res) => {
  const { email, name, URLimage, description } = req.body;
  Users.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (!user) {
      console.log("Usuario no encontrado");
      res.sendStatus(404);
      return;
    }

    Favorites.create({
      name,
      URLimage,
      description,
      authorId: user.id, // Asignar el authorId al ID del usuario encontrado
    })
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.error(err);
      });
  });
});
module.exports = routes;
