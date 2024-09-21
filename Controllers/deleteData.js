const db = require('../Services/firebase')

const deleteData = (collectionName) => {
    return async (req, res) => {
        try {
            const dataId = req.params.id

            const docRef = db.collection(collectionName).doc(dataId)
            const doc = await docRef.get()

            if (!doc.exists) {
                return res.status(404).send(`${collectionName} não encontrado`)
            }

            await docRef.delete()
            res.status(200).send(`${collectionName} com o ID ${dataId} deletado com sucesso`)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = deleteData