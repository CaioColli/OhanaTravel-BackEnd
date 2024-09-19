const express = require('express')
const cors = require('cors')
const hotelRoutes = require('./Routes/hotelRoutes')
const resortRoutes = require('./Routes/resortRoutes')

const app = express()
const door = 8000

// Por enquanto qualquer lugar pode fazer requisição
app.use(cors({origin:'*'}))

app.use('/hoteis', hotelRoutes)
app.use('/resorts', resortRoutes)

app.listen(door, () => {
    console.log(`Executando a porta ${door}`)
})
