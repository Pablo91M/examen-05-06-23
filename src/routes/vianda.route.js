const Router = require('express')
const controller = require('../controllers/vianda.controller')
const route = Router()

route.get("/",controller.getAllViandas)
route.get("/:codigo",controller.getViandaByCodigo)
route.put("/:codigo",controller.modificarVianda)
route.post("/",controller.registrarVianda)

module.exports = route