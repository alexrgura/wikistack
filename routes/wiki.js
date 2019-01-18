const express = require('express')
const router = express.Router()
module.exports = router
const views = require('../views/index');
const layout = require('../views/layout');
const models = require('../models/index.js')
const Sequelize = require('sequelize');


router.get('/', function(req, res, next) {
  res.send(layout(views.main));
})

router.get('/add', function(req, res, next) {
  res.send(layout(views.addPage))
})

router.post('/', async function(req, res, next) {
  const page = models.Page.build({
    Title: req.body.title,
    Content: req.body.content
  });

  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
})

