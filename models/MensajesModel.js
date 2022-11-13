const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    author: {
        id: {type: String},
        nombre: {type: String},
        apellido: {type: String},
        edad: {type: Number},
        alias: {type: String},
        avatar: {type: String},
    },
    text: {type: String}
});

const MessageModel = mongoose.model('mensajes', messageSchema);

module.exports = MessageModel;