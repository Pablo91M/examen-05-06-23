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
    const dni = req.params
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

    const registarAlumno = (req,res) => {
        const { dni, habilitado=true, edad, celiaco=false} = req.body
        const validarDni =!/^\d{8}$/
        if(!validarDni.test(dni)){
            res.status(400).json({
                mensaje: "El DNI debe tener 8 digitos numericos"
            })
        }
        const existeAlumno = alumnos.find(alumno => alumno.dni == dni)
        if(existeAlumno){
            res.status(400).json({
                mensaje: "El alumno ya esta registrado!"
            })
        }
        if(edad <18 || edad > 99){
            res.status(400).json({
                mensaje:" El alumno debe ser mayor a 18 y menor a 99 años"
            })
        }
        const nuevoAlumno ={
            dni,habilitado, edad, celiaco
        }
        alumnos.push(nuevoAlumno)
        res.status(201).json({
            mensaje: "El alumno fue registrado exitosamente!"
        })
    }

module.exports = {
    getAllAlumnos, getAlumnoByDni, modificarAlumno, registarAlumno
}