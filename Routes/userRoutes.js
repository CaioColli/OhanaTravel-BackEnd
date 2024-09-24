const { body, validationResult } = require("express-validator")
const authenticateToken = require("../Services/authenticateToken")
const createUser = require("../Services/userServices")
const { Router } = require('express')

const router = Router()

router.get('/', authenticateToken, (req, res) => {
    res.send('Rota protegida com autenticação')
})

router.post('/', [
    body('email').isEmail().withMessage('O email deve ser válido'),
    body('password').isLength({ min: 6 }).withMessage('A senha dever ter pelo menos 6 caracteres'),
    body('isAdmin').optional().isBoolean().withMessage('IsAdmin deve ser booleano')
], async (req, res) => {
    // Verifica se há erros de validação
    const errors = validationResult(req)
    
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password, isAdmin } = req.body

    try {
        const user = await createUser(email, password, isAdmin)
        res.status(201).send(`Usuário criado com sucesso: ${user.uid}`)
    } catch (error) {
        res.status(500).send('Erro ao criar usuário:' + error.message)
    }
})

module.exports = router