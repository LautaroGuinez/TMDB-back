const express = require("express");
const routes = express.Router();
const db = require("../db");
const { Favorites } = require("../models");


module.exports = routes