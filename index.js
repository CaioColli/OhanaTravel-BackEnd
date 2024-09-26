const express = require('express')
const cors = require('cors')
const hotelRoutes = require('./Routes/hotelRoutes')
const userRoutes = require('./Routes/userRoutes')
const currencyRoutes = require('./Routes/currencyRoutes')

const app = express()
app.use(express.json())
const door = 8000

// Por enquanto qualquer lugar pode fazer requisição
app.use(cors({origin:'*'}))

app.use('/hoteis', hotelRoutes)

app.use('/', userRoutes)

app.use('/currency', currencyRoutes)

app.listen(door, () => {
    console.log(`Executando a porta ${door}`)
})