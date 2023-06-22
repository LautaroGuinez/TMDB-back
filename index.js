const express = require("express");
const app = express();
const volleyball = require("volleyball");
const cors = require("cors")
const models = require("./models");
const db = require("./db");
const routes = require("./routes");


const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST' , 'DELETE'], 
};
// logging middleware
app.use(volleyball);
app.use(cors(corsOptions));


// parsing middleware
app.use(express.json());

app.use("/api", routes);



// error middleware -> https://expressjs.com/es/guide/error-handling.html
app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

db.sync({force : false})
  .then(function () {
    console.log("Conecction success DB!!!");
    app.listen(3001, () =>
      console.log("Servidor escuchando en el puerto 3001")
    );
  })
  .catch(console.error);