const { admin, db} = require('./firebase')

const createUser = async (email, firstName, lastName, password, isAdmin = false) => {
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
        })

        await db.collection('Usuários').doc(userRecord.uid).set({
            email,
            firstName,
            lastName,
            password,
            isAdmin
        })

        return userRecord
    } catch (error) {
        throw new Error(`Erro ao criar usuário: ${error.message}`)
    }
}

module.exports = createUser