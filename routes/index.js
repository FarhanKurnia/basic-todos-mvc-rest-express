const route = require('express').Router()
const todoRoutes = require('./todo.js')

route.use('/todos',todoRoutes)

route.get('/', (req, res) => {
    res.send('Hello World!')
  })

module.exports = route