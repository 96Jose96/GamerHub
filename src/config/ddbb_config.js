const mongoose = require('mongoose')
require('dotenv').config()
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            autoIndex: false // Desactiva la creación automática de índices
        });
        console.log('DataBase connection OK')
    } catch (error) {
        console.error (error)
        throw new Error ( 'DataBase connection FAILED')
    }
}
module.exports = {
    dbConnection
}