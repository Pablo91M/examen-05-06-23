const Router = require('express')
const controller = require('../controllers/alumno.controller')
const route = Router()

route.get("/",controller.getAllAlumnos)
route.get("/:dni",controller.getAlumnoByDni)
route.put("/:dni",controller.modificarAlumno)
route.post("/",controller.registarAlumno)

module.exports = route