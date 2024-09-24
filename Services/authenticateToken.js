const { admin, db} = require('./firebase')

const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).send('Token de autenticação ausente')
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token)
        const userRef = db.collection('Users').doc(decodedToken.uid)
        const userDoc = await userRef.get()

        if (!userDoc.exists) {
            return res.status(404).send('Usuário não encontrado')
        }

        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            isAdmin: userDoc.data().isAdmin
        }

        next()
    } catch (error) {
        return res.status(403).send('Token inválido ou expirado')
    }
}

module.exports = authenticateToken