const express = require('express');
const router = express.Router();

const { User, Page } = require('../models')
const { userList, userPages } = require('../views');

router.get('/', async (request, response, next) => {
  try {
    const users = await User.findAll();
    response.send(userList(users));
  }
  catch (error) { next(error); }
});

router.get('/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    const user = await User.findById(id);
    const pages = await Page.findAll({
      where: {
        authorId: id
      }
    })
    response.send(userPages(user, pages))
  }
  catch (error) { next(error); }
});

module.exports = router;