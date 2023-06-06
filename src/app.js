const express = require('express')
alumnosRouter = require('./routes/alumno.route')
viandaRouter = require('./routes/vianda.route')
pedidoRoute = require('./routes/pedido.route')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use('/api/alumnos',alumnosRouter)
app.use('/api/viandas',viandaRouter)
app.use('/api/pedidos',pedidoRoute)

app.listen(PORT, () => {
    console.log(`APP lista y escuchando en el puerto ${PORT}`)
})


