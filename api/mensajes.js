class Mensajes {
    constructor(table, knex){
        this.db = require("knex")(knex);
        this.table = table;
    }

    async listarAll(){
        try{
            return await this.db.from(this.table).select("*");
        }catch(err){
            console.log(err);
        }
    }

    async addMessage(message){
        try{
            return await this.db.from(this.table).insert(message);
        }catch(err){
            console.log(err);
        }

    }

}

module.exports = Mensajes;