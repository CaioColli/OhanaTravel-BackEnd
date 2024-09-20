const { getHotelsData, getHotelById, deleteHotelDataBase, postHotelDataBase, patchHotelDataBase } = require('../Controllers/hotelController')
const { Router } = require('express')

const router = Router()

router.get('/', getHotelsData)

router.get('/:id', getHotelById)

router.post('/', postHotelDataBase)

router.delete('/:id', deleteHotelDataBase)

router.patch('/:id', patchHotelDataBase)

module.exports = router