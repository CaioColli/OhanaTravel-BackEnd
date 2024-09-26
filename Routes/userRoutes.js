const { body } = require('express-validator')
const authenticateToken = require('../Services/authenticateToken')
const { Router } = require('express')
const { registerUser, loginUser } = require('../Controllers/userController')

const router = Router()

router.get('/', authenticateToken, (req, res) => {
    res.send('Rota protegida com autenticação')
})

// Rota de registro
router.post('/registrar', [
    body('email').isEmail().withMessage('O email deve ser válido'),
    body('firstName').notEmpty().withMessage('O nome é obrigatório'),
    body('lastName').notEmpty().withMessage('O sobrenome é obrigatório'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
], registerUser)

// Rota de login
router.post('/login', [
    body('email').isEmail().withMessage('O email deve ser válido'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
], loginUser)

module.exports = router