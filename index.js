const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const main = require('./views/main');

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request, response, next) => {
  response.send(main());
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
