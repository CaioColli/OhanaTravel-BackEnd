const {
    bucket,
    db
} = require('../Services/firebase')

const {
    getLastDataId,
    incrementDataId
} = require('../Services/getLastDataId')

const postData = (collectionName) => {
    return async (req, res) => {
        try {
            const data = req.body

            // Mapeia os arquivos para upload e obter as URLs
            const uploadPromises = req.files.map(async (file) => {
                const fileName = Date.now() + '_' + file.originalname // Gera um nome único
                const fileUpload = bucket.file(fileName)

                await fileUpload.save(file.buffer, {
                    metadata: {
                        contentType: file.mimetype,
                    },
                })

                return `https://storage.googleapis.com/${bucket.name}/${fileName}` // URL do arquivo
            })

            const imageUrls = await Promise.all(uploadPromises)
            data.images = imageUrls // Armazena as URLs das imagens

            // Recupera o último ID e incrementa + 1
            const lastId = await getLastDataId(collectionName)
            const newId = Number(lastId) + 1
            
            // Define o novo valor com o ID incrementado
            await db.collection(collectionName).doc(newId.toString()).set(data)

            await incrementDataId(newId, collectionName)

            res.status(200).send(`${collectionName} adicionado com sucesso`)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = postData