const express = require('express');
const router = express.Router();

const { Page } = require('../models');
const main = require('../views/main');

router.get('/', async (request, response, next) => {
  const pages = await Page.findAll();
  response.send(main(pages));
});

module.exports = router;
