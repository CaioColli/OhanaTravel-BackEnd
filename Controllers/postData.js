const db = require('../Services/firebase')
const {
    getLastDataId,
    incrementDataId
} = require('../Services/getLastDataId')

const postData = (collectionName) => {
    return async (req, res) => {
        try {
            const data = req.body

            // Mapeia os arquivos para obter o caminho de cada uma imagem
            const images = req.files.map(file => file.path) // path = caminho

            data.images = images

            // Recupera o último ID e incrementa + 1
            const lastId = await getLastDataId(collectionName)
            const newId = lastId + 1

            // Define o novo valor com o ID incrementado
            await db.collection(collectionName).doc(newId.toString()).set(data) // Converti o ID para string ao ser adicionado

            await incrementDataId(newId, collectionName)

            res.status(200).send(`${collectionName} adicionado com sucesso`)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = postData