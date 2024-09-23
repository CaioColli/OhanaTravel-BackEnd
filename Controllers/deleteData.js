const {
    db,
    bucket
} = require('../Services/firebase')

const deleteData = (collectionName) => {
    return async (req, res) => {
        try {
            const dataId = req.params.id

            const docRef = db.collection(collectionName).doc(dataId)
            const doc = await docRef.get()

            if (!doc.exists) {
                return res.status(404).send(`${collectionName} não encontrado`)
            }

            const data = doc.data() // Obtém os dados do documento
            const imageUrls = data.images || [] // Garantir que tem um array

            // Deletar as imagens do Firebase Storage
            const deletePromises = imageUrls.map(async (url) => {
                const fileName = url.split('/').pop() // Obtém o nome do arquivo a partir da URL
                const file = bucket.file(fileName)
                
                try {
                    await file.delete() // Tenta deletar o arquivo
                } catch (deleteError) {
                    console.log(`Erro ao deletar ${fileName}: ${deleteError.message}`)
                }
            })

            // Aguarda a conclusão das promessas de deleção
            await Promise.all(deletePromises)

            // Deletar o documento da coleção
            await docRef.delete()
            res.status(200).send(`${collectionName} com o ID ${dataId} deletado com sucesso`)
        } catch (error) {
            console.error(error)
            res.status(500).send(`Erro ao deletar ${collectionName} com ID ${dataId}: ${error.message}`)
        }
    }
}

module.exports = deleteData


module.exports = deleteData