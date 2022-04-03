const express = require('express')
const routes = express.Router()
const RoutesUtils = require('./utils/RoutesUtils')
const Database = require('../src/db/config')

// Enabling the shortened link
routes.get('/:code', async (req, res, next) => {
  const code = req.params.code

  const db = await Database()
  const dbData = await db.get(`SELECT url FROM urls WHERE code = "${code}"`)
  await db.close()

  if (!dbData) return res.sendStatus(404)

  res.redirect(dbData.url)
})

// GET home page.
routes.get('/', (req, res, next) => {
  res.render('index', { title: 'Link Shortener' })
})

// Send URL Form and save in to DB
routes.post('/new', async (req, res, next) => {
  const code = RoutesUtils.generateCode()
  const url = req.body.url

  const db = await Database()
  const dbData = await db.run(`INSERT INTO urls (
    code,
    url
 ) VALUES (
     "${code}",
     "${url}"
);`)

  await db.close()

  res.render('stats', {code: code, url: url})
})

module.exports = routes
