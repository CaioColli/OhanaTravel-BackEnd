const db = require('../Services/firebase')

const getData = (collectionName) => {
    return async (req, res) => {
        try {
            const docRef = db.collection(collectionName)
            const snapshot = await docRef.get()

            if(snapshot.empty) {
                return res.status(404).send(`Nenhum dado encontrado na categoria ${collectionName}`)
            }

            // Extrai todos os dados de cada documento
            const data = []
            snapshot.forEach(doc => {
                data.push({
                    id: doc.id,
                    ...doc.data() // Com o spread pega os dados de cada documento
                })
            })

            res.status(200).json(data)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = getData