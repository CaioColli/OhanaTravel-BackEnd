const axios = require('axios')

const getCurrencyApi = async () => {
    const API_KEY = '8113720fa0f5677e55eac004'
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/BRL`

    try {
        const response = await axios.get(url)
        const convertCurrency = response.data.conversion_rates.USD
        return convertCurrency
    } catch (error) {
        console.error('Erro ao buscar a taxa de câmbio', error.message)
    }
}

module.exports = getCurrencyApi