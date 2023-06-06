const Router = require('express')
const controller = require('../controllers/pedido.controller')
const route = Router()

route.get("/",controller.getAllPedidos)
route.get("/:id",controller.getPedidosById)
route.post("/",controller.registrarPedido)

module.exports = route