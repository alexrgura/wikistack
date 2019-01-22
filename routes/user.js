const express = require('express')
const router = express.Router()

const views = require('../views/index');
const layout = require('../views/layout');
const models = require('../models/index.js');
const Sequelize = require('sequelize');


module.exports = router

router.get('/:id', async function(req,res,next){
  let userId = req.params.id
  let user = await models.User.findOne({
    where: {id : userId}}
  )

  let pages = await models.Page.findAll({
    where: {authorId : userId}
  })

  res.send(layout(views.userPages(user, pages)))


})


router.get('/', async function(req,res,next){
  let users = await models.User.findAll();

  res.send(layout(views.userList(users)))

})
