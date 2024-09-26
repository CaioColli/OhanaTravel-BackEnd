const getCurrencyApi = require('../Services/currencyService')

const convertCurrency = async (req, res) => {
    try {
        // Obtem a taxa de câmbio da função
        const rate = await getCurrencyApi()

        // Recebe o valor em reais a partir da query string
        const initialValue = parseFloat(req.query.value)

        // Valida se o valor é um numero válido
        if (isNaN(initialValue) || initialValue <= 0) {
            return res.status(400).json({ message: 'Forneça um valor válido '})
        }

        const finalValue = parseFloat((initialValue * rate).toFixed(2))

        res.json({ rate, initialValue, finalValue })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter a taxa de câmbio'})
    }
}

module.exports = convertCurrency