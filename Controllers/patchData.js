const db = require('../Services/firebase')

const patchData = (collectionName) => {
    return async (req, res) => {
        try {
            const dataId = req.params.id

            const modification = req.body

            const docRef = db.collection(collectionName).doc(dataId)
            const doc = await docRef.get()

            if (!doc.exists) {
                res.status(404).send(`${collectionName} não encontrado`)
            }

            await docRef.update(modification)

            res.status(200).send(`${collectionName} com o ID ${dataId} atualizado com sucesso`)
        } catch (error) {
            res.status(500).send(`Hotel edita com sucessor com ID ${dataId}`)
        }
    }
}

module.exports = patchData