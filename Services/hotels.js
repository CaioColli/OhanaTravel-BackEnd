// const db = require('../Services/firebase')

// const getHotelDataBase = async () => {
//     try {
//         const snapshot = await db.collection('Hotels').get()
//         const hotels = snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }))

//         return hotels
//     } catch (error) {
//         throw new Error(`Erro ao receber os dados ${error.message}`)
//     }
// }

// module.exports = getHotelDataBase