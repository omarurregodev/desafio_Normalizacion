class Productos {
    constructor(table, knex) {
        // this.productos = [];
        // this.id = 0;
        this.db = require("knex")(knex);
        this.table = table;
    }

    // listar(id) {
    //     let prod = this.productos.find((prod) => prod.id == id);
    //     return prod || {error: "producto no encontrado"};
    // }

    async listarAll() {
        // return this.productos.length > 0
        //     ? this.productos
        //     : {error: "No hay productos cargados"}
        try {
            return await this.db.from(this.table).select("*")
        } catch (err) {
            console.log(err);
        }
    }

    async guardar(prod) {
        // prod.id == ++this.id;
        // this.productos.push(prod);
        try {
            return await this.db(this.table).insert(prod)
        } catch (err) {
            console.log(err);
        }
    }

    // actualizar(prod, id) {
    //     prod.id = Number(id);
    //     let index = this.productos.findIndex((prod) => prod.id == id);
    //     this.productos.splice(index, 1, prod)
    // }

    // borrar(id) {
    //     let index = this.productos.findIndex((prod) => prod.id == id);
    //     return this.productos.splice(index, 1);
    // }
}

module.exports = Productos;