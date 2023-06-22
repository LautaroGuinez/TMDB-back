const express = require("express");
const routes = express.Router();
const db = require("../db");
const { Users, Favorites } = require("../models");

routes.post("/" , (req ,res)=>{
    const {name , email , password} = req.body
    Users.create({
        name,
        email,
        password
      })
        .then(user => {
          res.status(200).json({ message: "User created successfully", user });
        })
        .catch(error => {
          res.status(500).json({ message: "Error creating user" });
        });
})
module.exports = routes;