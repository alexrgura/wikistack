const express = require('express');
const router = express.Router();
module.exports = router;
const views = require('../views/index');
const layout = require('../views/layout');
const models = require('../models/index.js');
const Sequelize = require('sequelize');

router.get('/', async function(req, res, next) {
  const pages = await models.Page.findAll();
  console.log(pages);
  res.send(layout(views.main(pages)));
});

router.get('/add', function(req, res, next) {
  res.send(layout(views.addPage));
});

router.get('/:slug', async function(req, res, next) {
  try {
    const currentPage = await models.Page.findOne({
      where: { Slug: req.params.slug },
    });
    const user = await models.User.findOne({
      where: { id: currentPage.authorId }
    })
    res.send(layout(views.wikiPage(currentPage, user.Name)));
  } catch (error) {
    next(error);
  }
});

router.post('/', async function(req, res, next) {
  try {
    const page = await models.Page.create({
      Title: req.body.title,
      Content: req.body.content,
    });

    const [user, wasCreated] = await models.User.findOrCreate({
      where: {
        Name: req.body.author,
        Email: req.body.authorEmail,
      },
    });
    await page.setAuthor(user);
    res.redirect(`/wiki/${page.Slug}`);
  } catch (error) {
    next(error);
  }
});
