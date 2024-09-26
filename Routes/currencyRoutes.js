const { Router } = require('express')
const convertCurrency = require('../Controllers/getCurrency')

const router = Router()

router.get('/', convertCurrency)

module.exports = router