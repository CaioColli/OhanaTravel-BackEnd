const { getHotelsData, deleteHotelDataBase, postHotelDataBase } = require('../Controllers/hotelController')
const { Router } = require('express')

const router = Router()

router.get('/', getHotelsData)

router.post('/', postHotelDataBase)

router.delete('/:id', deleteHotelDataBase)

module.exports = router