const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

// const main = require('./views/main');
const { Page, User } = require('./models');
const wikiRoutes = require('./routes/wiki');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/wiki', wikiRoutes);
app.use('/users', userRoutes);

app.get('/', (request, response, next) => {
  response.redirect('/wiki');
});

const init = async () => {
  await Page.sync();
  await User.sync();

  const PORT = 1337;
  app.listen(PORT, async () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
}

init();
