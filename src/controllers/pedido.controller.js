const pedidos = require('../../data/pedidos.json')
const viandas = require('../../data/viandas.json')
const alumnos = require('../../data/alumnos.json')

const getAllPedidos = (req,res) => {
    res.status(200).json(pedidos)
}

const getPedidosById = (req,res) => {
    const id = req.params.id
    const resultado = pedidos.find(pedidos => pedidos.id == id)
    if(resultado){
        res.status(200).json(resultado)
    } else {
        res.status(404).json({
            mensaje: `El pedido con el ID ${id} no fue encontrado!`
        })
    }
}

const registrarPedido = (req, res) => {
    const { dni, tipo } = req.body
  
    const alumno = alumnos.find(alumno => alumno.dni == dni && alumno.habilitado);
    if (!alumno) {
      res.status(400).json({
        mensaje: `El alumno con el DNI ${dni} no existe.`
      })
    }
    const vianda = viandas.find(vianda => 
      vianda.stock >0 && vianda.tipo == tipo && vianda.aptoCeliaco == vianda.celiaco)
  
    if (!vianda) {
      return res.status(400).json({
        mensaje: "No hay viandas disponibles que cumplan con las condiciones solicitadas."
      })
    }
  
    const id = pedidos.length > 0 ? pedidos[pedidos.length - 1].id + 1 : 1
    const fecha = new Date().toISOString().slice(0, 10);
    vianda.stock--
    alumno.habilitado = false

    const nuevoPedido = {
      id,
      fecha,
      alumno: {
        dni: alumno.dni,
        nombre: alumno.nombre,
        celiaco: alumno.celiaco,
        edad: alumno.edad
      },
      vianda: {
        codigo: vianda.codigo,
        tipo: vianda.tipo,
        aptoCeliaco: vianda.aptoCeliaco,
        descripcion: vianda.descripcion
      }
    }
  
    pedidos.push(nuevoPedido);
  
    res.status(201).json({
      mensaje: "El pedido fue registrado exitosamente."
    })
  }
  
  module.exports = {
    getAllPedidos,
    getPedidosById,
    registrarPedido
  }