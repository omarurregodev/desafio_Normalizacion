const mongoose = require('mongoose');
const MessageModel = require('../models/MensajesModel.js');
const { normalize, denormalize, schema } = require('normalizr');
const util = require('util');

class Mensaje {
    constructor() {
        this.url = 'mongodb+srv://omarurregodev:oturrego0712@normalizrcluster.u64wunr.mongodb.net/?retryWrites=true&w=majority';
        this.mongodb = mongoose.connect;
    }

    async save(msg) {
        try {
            await this.mongodb(this.url)
            const result = await msg.save();
            return result;
        } catch (err) {
            return err;
        }
    }

    async createMsg(msg) {
        try {
            await this.mongodb(this.url)
            alert("entro aqui", msg);
            const newMessage = await this.save(
                new MessageModel({
                    author: {
                        email: msg.email,
                        nombre: msg.nombre,
                        apellido: msg.apellido,
                        edad: msg.edad,
                        alias: msg.alias,
                        avatar: msg.avatar,
                    },
                    text: msg.message,
                })
            );
            return newMessage;

        } catch (err) {
            return err;
        }
    }

    async getAll() {
        try {
            await this.mongodb(this.url);
            return await MessageModel.find();

        } catch (err) {
            return err;
        }
    }

    async normalize(){
        let messages = {messages: await this.getAll()};
        const authorSchema = new schema.Entity(
            "authors", {}, { idAttribute: "email" }
        );
        const messageSchema = new schema.Entity("message",{author: authorSchema});
        const msgSchema = { messages: [messageSchema]};
        const normalizado = normalize(messages, msgSchema);

        console.log(normalizado);

        return normalizado;

    }
}

module.exports = Mensaje;