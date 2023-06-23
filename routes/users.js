const express = require("express");
const routes = express.Router();
const cookieParser = require("cookie-parser");
const db = require("../db");
const Token = require("../config/token");
const validateUser = require("../middelware/auth");
const { Users, Favorites } = require("../models");

routes.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  Users.create({
    name,
    email,
    password,
  })
    .then((user) => {
      res.status(200).json({ message: "User created successfully", user });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error creating user" });
    });
});

routes.post("/login", (req, res) => {
  const { name, password } = req.body;
  Users.findOne({
    where: { name },
  }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((bool) => {
      if (!bool) {
        return res.sendStatus(401);
      } else {
        const payload = {
          email: user.email,
          name: user.name,
        };
        const token = Token.generateToken(payload);
        res.cookie("token", token);
        res.send(payload);
      }
    });
  });
});
routes.get("/me", validateUser, (req, res, next) => {
  res.send(req.user);
});
routes.post("/logout", (req, res, next) => {
  res.clearCookie("token").sendStatus(204);
});

module.exports = routes;
