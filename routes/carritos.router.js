import express from "express";
import Carrito from "../DAOs/carrito.dao.class.js";

const router = express.Router();

const carrito = new Carrito();

router.post("/", async (req, res) => {
    try {
        const carritoCreado = await carrito.crearCarrito();
        res.send(carritoCreado);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const carritoBorrado = await carrito.borrar(req.params.id);
        res.send(carritoBorrado);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/", async (req, res) => {
    try {
        const listaCarritos = await carrito.listarAll();
        res.send(listaCarritos);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/:id/productos", async (req, res) => {
    try {
        const listaCarro = await carrito.listar(req.params.id);
        res.send(listaCarro);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/:id/productos/:idPrd", async (req, res) => {
    try {
        const modCarrito = await carrito.guardarProductoEnCarrito(
            req.params.idPrd,
            req.params.id
        );
        res.send(modCarrito);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.delete("/:id/productos/:idPrd", async (req, res) => {
    try {
        const deleteProdCarrito = await carrito.eliminarProductoEnCarrito(
            req.params.idPrd,
            req.params.id
        );
        res.send(deleteProdCarrito);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

export default router;
