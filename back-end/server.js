const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require('./app/routes/index.routes.js');

const db = require("./app/models");

const app = express();

db.sequelize.sync({ force: true }).then(() => {
  console.log("Database synchronized.");
});

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my react-nodejs-express application for Software Engineering." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
