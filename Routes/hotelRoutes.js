const { getHotelsData } = require('../Controllers/index')
const { Router } = require('express')

const router = Router()

router.get('/', getHotelsData)

module.exports = router