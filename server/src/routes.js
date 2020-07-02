const express = require('express')

const PointsController = require('./controllers/pointsController')
const ItemsController = require('./controllers/itemsController')

const routes = express.Router()
const pointsController = new PointsController()
const itemsController = new ItemsController()


routes.get('/items', itemsController.index )

routes.post('/points', pointsController.create)
routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)


module.exports = routes