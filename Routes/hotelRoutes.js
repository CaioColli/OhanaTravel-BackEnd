const { Router } = require('express')
const getDataById = require('../Controllers/getDataById')
const imageUpload = require('../Config/multerConfig')
const getData = require('../Controllers/getData')
const deleteData = require('../Controllers/deleteData')
const postData = require('../Controllers/postData')
const patchData = require('../Controllers/patchData')

const router = Router()

router.get('/', getData('Hotels'))

router.get('/:id', getDataById('Hotels'))

router.post('/', imageUpload.array('images', 7), postData('Hotels')) // Cada post é limitado a 7 imagens

router.delete('/:id', deleteData('Hotels'))

router.patch('/:id', patchData('Hotels'))

module.exports = router