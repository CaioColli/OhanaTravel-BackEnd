const db = require('./firebase')

// Essa função pega o ultimo ID registrado no banco, se não tiver, inicializa com id 0
const getLastHotelId = async (entityType) => {
    // No banco tem uma seleção que contabiliza numero atual o ID que dei o nome de currentID
    const docRef = db.collection('currentID').doc(entityType)
    const doc = await docRef.get()

    if (!doc.exists) {
        await docRef.set({ lastId: 0 }) // Inicializa com 0 se lastId se não existir
        return 0
    }

    return doc.data().lastId
}

// Essa função tem o papel de incrementar os ID
const incrementHotelId = async (newId) => {
    const docRef = db.collection('currentID').doc('Hotels')
    await docRef.update({ lastId: newId })
}

module.exports = {
    getLastHotelId,
    incrementHotelId
}
