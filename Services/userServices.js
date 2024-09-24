const { admin, db} = require('./firebase')

const createUser = async (email, password, isAdmin = false) => {
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
        })

        await db.collection('Users').doc(userRecord.uid).set({
            email,
            isAdmin,
        })

        return userRecord
    } catch (error) {
        throw new Error(`Erro ao criar usuário: ${error.message}`)
    }
}

module.exports = createUser