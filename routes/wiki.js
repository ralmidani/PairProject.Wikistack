const express = require("express");
const router = express.Router();

const { Page, User } = require("../models");
const { main, addPage, wikiPage } = require("../views");
// const addPage = require('../views/addPage');

router.get("/", async (request, response, next) => {
  const pages = await Page.findAll();
  response.send(main(pages));
});

router.get("/add", async (request, response, next) => {
  response.send(addPage());
});

router.get("/:slug", async (request, response, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: request.params.slug }
    });
    response.send(wikiPage(page, await page.getAuthor()));
  } catch(error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  const { title, content, name, email, status } = request.body;
  // User.create({name: 'Cody'})
  try {
    const author = await User.findOrCreate({ 
      where: {
        name, email
      }
    });
    console.log(author[0]);
    const page = await Page.create({ title, content, status, authorId: author[0].id });
    console.log(page);
    response.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
