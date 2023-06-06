const viandas = require('../../data/viandas.json')

const getAllViandas = (req,res) => {
    res.status(200).json(viandas)
}

const getViandaByCodigo = (req,res) => {
    const codigo = req.params.codigo
    const resultado = viandas.find(viandas => viandas.codigo == codigo)
    if(resultado){
        res.status(200).json(resultado)
    } else {
        res.status(404).json({
            mensaje: `La vianda con el codigo ${codigo} no fue encontrado`
        })
    }
}

const modificarVianda = (req,res) => {
    const codigo = req.params.codigo
    const{ aptoCeliaco, stock, descripcion} = req.body
    const indice = viandas.findIndex(v => v.codigo == codigo)
    if(indice >= 0){
        const vianda = viandas[indice]
        if(aptoCeliaco !== undefined){
            vianda.aptoCeliaco = aptoCeliaco
        }
        if(stock !== undefined){
            vianda.stock = stock
        }
        if(descripcion !== undefined){
            vianda.descripcion = descripcion
        }
        res.status(201).json({
            mensaje: "La vianda fue modificada con exito!"
        })
    }
    res.status(404).json({
        mensaje: `La vianda con el codigo ${codigo} no fue encontrada`
    })
}

const registrarVianda = (req,res)=> {
    const {codigo,tipo,stock =0, descripcion,aptoCeliaco=false} = req.body

    const existeVianda = viandas.find(vianda => vianda.codigo === codigo)
    if(existeVianda){
        res.status(400).json({
            mensaje: "La vianda ya esta registrada"
        })
    }
    if(!codigo || codigo.length !== 5 || codigo[0] !== 'v' && codigo[0] !== 'V'){
        res.status(400).json({
            mensaje: "El codigo de la vianda debe ser de 5 letras y debe comenzar con la letra v/V"
        })
    }
    const permitidos =['TARTA', 'POLLO', 'PASTA', 'PIZZA', 'EMPANADAS']
    if(!permitidos.includes(tipo)){
        res.status(400).json({
            mensaje: "Tipo de vianda incorrecta"
        })
    }
    if(stock <0){
        res.status(400).json({
            mensaje: "El stock debe ser mayor a 0"
        })
    }
    const nuevaVianda ={
        codigo,tipo, stock, descripcion,aptoCeliaco
    }
    viandas.push(201).json({
        mensaje: "La vianda fue registrada exitosamente!",
        vianda: nuevaVianda
    })
}

module.exports = {
    getAllViandas, getViandaByCodigo, modificarVianda,registrarVianda
}