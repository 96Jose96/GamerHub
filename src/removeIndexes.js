require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user.model'); // Ruta correcta al modelo
async function removeIndexes() {
    try {
        // Conectar a la base de datos
        await mongoose.connect(process.env.MONGO_URI, {
            autoIndex: false,
        });
        console.log('Conexión a MongoDB establecida.');
        const indexes = await User.collection.getIndexes();
        console.log('Índices actuales:', indexes);
        // Elimina cualquier índice relacionado con idToken
        if (indexes.idToken_1) {
            await User.collection.dropIndex('idToken_1');
            console.log('Índice idToken_1 eliminado.');
        } else {
            console.log('No se encontró el índice idToken_1.');
        }
        mongoose.disconnect();
    } catch (error) {
        console.error('Error eliminando índices:', error);
    }
}
removeIndexes()


