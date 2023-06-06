const Router = require('express')
const controller = require('../controllers/pedido.controller')
const route = Router()

route.get("/",controller.getAllPedidos)
route.get("/:id",controller.getPedidosById)

module.exports = route