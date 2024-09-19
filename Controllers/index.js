const getHotelsData = (req, res) => {
    try {
        res.send('Hotéis')
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

const getResortsData = (req, res) => {
    try {
        res.send('Resorts')
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    getHotelsData,
    getResortsData
}