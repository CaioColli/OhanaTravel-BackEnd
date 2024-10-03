const { validationResult } = require('express-validator')
const createUser = require('../Services/userServices')
const { default: axios } = require('axios')
const { db } = require('../Services/firebase')
require('dotenv').config()

const registerUser = async (req, res) => {
    // Verificação de erros de validação
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, firstName, lastName, password, isAdmin = false } = req.body

    try {
        const user = await createUser(email, firstName, lastName, password, isAdmin)
        return res.status(201).send(`Usuário criado com sucesso ${user.uid}`)
    } catch (error) {
        return res.status(500).send('Este e-mail já está em uso')
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
            email,
            password,
            returnSecureToken: true
        })

        const { idToken, refreshToken, expiresIn, localId } = response.data

        // Busca o nome do usuário no Firestore
        const userDoc = await db.collection('Usuários').doc(localId).get()
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }
        const firstName = userDoc.data().firstName
        const isAdmin = userDoc.data().isAdmin

        return res.status(200).json({
            message: 'Login bem-sucedido',
            idToken,
            refreshToken,
            expiresIn,
            uid: localId,
            firstName,
            isAdmin
        })
    } catch (error) {
        console.error("Erro ao fazer login:", error.response ? error.response.data : error.message) // Para debugar
        return res.status(400).json({ message: 'Email ou senha inválida' })
    }
}


module.exports = {
    registerUser,
    loginUser
}