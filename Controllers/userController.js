const { validationResult } = require('express-validator')
const createUser = require('../Services/userServices')
const { default: axios } = require('axios')
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

        return res.status(200).json({
            message: 'Login bem-sucedido',
            idToken,
            refreshToken,
            expiresIn,
            uid: localId
        })
    } catch (error) {
        return res.status(400).json({ message: 'Email ou senha inválida' })
    }
}

module.exports = {
    registerUser,
    loginUser
}