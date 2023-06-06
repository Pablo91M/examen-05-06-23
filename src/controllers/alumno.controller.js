const alumnos = require('../../data/alumnos.json')

const getAllAlumnos = (req,res) => {
    res.status(200).json(alumnos)
}

const getAlumnoByDni = (req,res) => {
    const dni = req.params.dni
    const resultado = alumnos.find(alumnos => alumnos.dni == dni)
    if(resultado){
        res.status(200).json(resultado)
    } else {
        res.status(404).json({
            mensaje: `el alumno con el DNI ${dni} no fue encontrado`
        })
    }
}

const modificarAlumno = (req,res) =>{
    const dni = req.params.dni
    const {habilitado, celiaco, edad} = req.body
    const indice = alumnos.findIndex(a => a.dni == dni)
    if(indice >= 0){
        const alumno = alumnos[indice]
        if(habilitado !== undefined){
            alumno.habilitado = habilitado
        }
        if(celiaco !== undefined){
            alumno.celiaco = celiaco
        }
        if(edad !== undefined){
            alumno.edad = edad
        }
        res.status(201).json({
            mensaje: 'El alumno fue modificado con exito'
        })
    } res.status(404).json({
        mensaje:`El alumno con el DNI ${dni} no fue encontrado!`
    })
    }

module.exports = {
    getAllAlumnos, getAlumnoByDni, modificarAlumno
}