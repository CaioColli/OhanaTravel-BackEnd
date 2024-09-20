const db = require('../Services/firebase')
const {
    getLastHotelId,
    incrementHotelId
} = require('../Services/getLastHotelId')

const getHotelDataBase = require('../Services/hotels')

const getHotelsData = async (req, res) => {
    try {
        const hotels = await getHotelDataBase()
        res.status(200).json(hotels)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getHotelById = async (req, res) => {
    try {
        const hotelId = req.params.id
        const docRef = db.collection('Hotels').doc(hotelId)
        const doc = await docRef.get()

        if (!doc.exists) {
            return res.status(404).send('Hotel não econtrado')
        }

        res.status(200).json({ id: doc.id, ...doc.data() })

    } catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteHotelDataBase = async (req, res) => {
    const hotelId = req.params.id // Obtenho o id do hotel para ser deletado da URL
    try {
        const docRef = db.collection('Hotels').doc(hotelId)
        const doc = await docRef.get()

        if (!doc.exists) {
            return res.status(404).send('Hotel não encontrado')
        }

        await docRef.delete()
        res.status(200).send(`Hotel com ID: ${hotelId} deletado com sucesso`)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const postHotelDataBase = async (req, res) => {
    try {
        const hotelData = req.body

        // Recupera o último ID e incrementa + 1
        const lastId = await getLastHotelId('Hotels')
        const newId = lastId + 1

        // Define o novo hotel com o ID incremental
        await db.collection('Hotels').doc(newId.toString()).set(hotelData) // Converta o ID para string ao adicionar

        // Atualiza o lastId na Meta
        await incrementHotelId(newId)

        res.status(200).send(`Hotel adicionado com sucesso com ID ${newId}`)

        //const hotelData = req.body // Obtem os dados do corto da requisição
        //const docRef = await db.collection('Hotels').add(hotelData) // Adiciona novos dados no banco
        //res.status(200).send(`Hotel adicionado com sucesso ${docRef.id}`)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const patchHotelDataBase = async (req, res) => {
    try {
        const hotelId = req.params.id

        const modification = req.body

        const docRef = db.collection('Hotels').doc(hotelId)
        const doc = await docRef.get()

        if (!doc.exists) {
            return res.status(404).send('Hotel não encontrado')
        }

        await docRef.update(modification)
        
        res.status(200).send(`Hotel com ID ${hotelId} atualizado com sucesso`)
    } catch (error) {
        res.status(500).send(`Hotel edita com sucessor com ID ${hotelId}`)
    }
}

module.exports = {
    getHotelsData,
    getHotelById,
    deleteHotelDataBase,
    postHotelDataBase,
    patchHotelDataBase
}