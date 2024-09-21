const db = require('../Services/firebase')

const getDataById = (collectionName) => {
    return async (req, res) => {
        try {
            const dataId = req.params.id

            const docRef = db.collection(collectionName).doc(dataId)
            const doc = await docRef.get()

            if (!doc.exists) {
                return res.status(404).send(`${collectionName.slice(0, -1)} não encontrado`)
            }

            res.status(200).json({
                id: doc.id,
                ...doc.data()
            })
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = getDataById