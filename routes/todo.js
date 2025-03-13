const todoRoute = require('express').Router()
const TodoController = require('../controllers/TodoController')

todoRoute.get('/', TodoController.index)
todoRoute.post('/', TodoController.create)
todoRoute.get('/:uuid', TodoController.findByUuid)
todoRoute.put('/:uuid', TodoController.update)
todoRoute.delete('/:uuid', TodoController.delete)


module.exports = todoRoute