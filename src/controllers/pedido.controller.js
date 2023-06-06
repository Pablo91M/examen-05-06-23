const pedidos = require('../../data/pedidos.json')

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


module.exports = {
    getAllPedidos, getPedidosById
}