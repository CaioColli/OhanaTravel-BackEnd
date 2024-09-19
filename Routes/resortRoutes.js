const { getResortsData } = require('../Controllers/index')
const { Router } = require('express')

const router = Router()

router.get('/', getResortsData)

module.exports = router