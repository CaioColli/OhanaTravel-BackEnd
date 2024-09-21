const multer = require('multer')
const path = require('path')

// Configuração de armazenamento
const imagesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Gera um nome único com a extensão correta
    }
})

// Filtro para o tipo de imagem
const fileFilter = (req, file, cb) => {
    const allowedMimeType = ['image/jpeg', 'image/png']

    if (allowedMimeType.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Apenas imagens são permitidas'))
    }
}

const imageUpload = multer({
    storage: imagesStorage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limitei para que a imagem não passe de 5Mb
    },
    fileFilter: fileFilter
})

module.exports = imageUpload