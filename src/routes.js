const express = require('express')
const routes = express.Router()
const RoutesUtils = require('./utils/RoutesUtils')




/* GET home page. */
routes.get('/', (req, res, next) => {
  res.render('index', { title: 'Link Shortener' })
})

routes.post('/new', async (req, res, next) => {
  const url = req.body.url
  const code = RoutesUtils.generateCode()

  const resultado = await Link.create({  //insert into Database nos campos url e code Arrumar
    url,
    code
  })
  res.render('stats', resultado.dataValues);
})

module.exports = routes;