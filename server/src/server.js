const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/api/pages', async (req, res) => {
  const results = await db.getPages()
  res.json(results)
})

app.get('/api/pages/:id', async (req, res) => {
  const results = await db.getSinglePage(req.params.id)
  res.json(results)
})

app.post('/api/pages', async (req, res) => {
  const newPage = await db.createPage(req.body)
  res.json(newPage)
})

app.put('/api/pages/:id', async (req, res) => {
  const updatedPage = await db.updatePage(req.params.id, req.body)
  res.json(updatedPage)
})

app.delete('/api/pages/:id', async (req, res) => {
  await db.deletePage(req.params.id)
  res.json({
    message: 'Page deleted successfully'
  })
})

module.exports = app
