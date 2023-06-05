const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.listen(PORT, () => {
    console.log(`App lista escuchando en el puerto ${PORT}`)
  })