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

module.exports = {
    getAllViandas, getViandaByCodigo, modificarVianda
}