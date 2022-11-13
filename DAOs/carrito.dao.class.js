import mongoose from "mongoose";
import Producto from "./producto.dao.class.js";
// import CarritoModel from "../models/";

export default class Carrito {
    constructor() {
        this.producto = new Producto();
        this.url = 'mongodb+srv://omarurregodev:oturrego1234@cluster0.bwe1f85.mongodb.net/?retryWrites=true&w=majority'
        this.mongodb = mongoose.connect;
    }

    async listar(id) {
        try {
            await this.mongodb(this.url);
            return await CarritoModel.findById(id);
        } catch (err) {
            throw new Error('No existe el carrito.');
        }
    }

    async listarAll() {
        try {
            await this.mongodb(this.url);
            return await CarritoModel.find();
        } catch (err) {
            throw new Error('No existen carritos.');
        }
    }

    async crearCarrito() {
        try {
            await this.mongodb(this.url);
            const newCarrito = new CarritoModel();
            return await newCarrito.save();
        } catch (err) {
            throw new Error('El carrito no pudo ser creado.');
        }
    }

    async guardarProductoEnCarrito(idPrd, idCarrito) {
        try {
            const product = await this.producto.listar(idPrd);
            const carr = await this.listar(idCarrito);
            if (carr === null) {
                return null;
            }
            let existingProd = carr.productos.find((x) => x.producto == product.id);
            if (existingProd) {
            let filter = { "productos._id": existingProd._id };
            let update = {
                $set: {
                "productos.$.stock": existingProd.stock + product.stock,
                },
            };
            let options = { new: true };
            return await CarritoModel.findOneAndUpdate(filter, update, options);
            } else {
            carr.productos.push({ producto: product.id, stock: product.stock });
            let result = await CarritoModel.findByIdAndUpdate(idCarrito, carr, { new: true });
            return result;
            }
        } catch (err) {
            throw new Error('El producto no pudo ser creado en el carrito.');
        }
    }

    async borrar(id) {
        try {
            await this.mongodb(this.url);
            return await CarritoModel.findByIdAndDelete(id)
        } catch (err) {
            throw new Error('El carrito no pudo ser eliminado.');
        }
    }

    async eliminarProductoEnCarrito(idPrd, idCarrito) {
        try {
            const carr = await this.listar(idCarrito);
            if (carr === null) {
                return null;
            }
            let existingProd = carr.productos.find((x) => x.producto == idPrd);
            if (existingProd === null) {
            return null;
            }
            return await CarritoModel.findByIdAndUpdate(idCarrito, {
            $pull: {
                productos: { _id: existingProd._id },
            },
            }, { new: true });
        } catch (err) {
            throw new Error('El producto no pudo ser eliminado del carrito.');
        }
    }

}