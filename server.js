const express = require("express");
const ProductosDao = require("./DAOs/producto.dao.class.js");
const MensajesDao = require("./DAOs/mensajes.dao.class.js");
const prodRouter = require("./routes/productos.router.js");
const { faker } = require("@faker-js/faker");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");


const router = express.Router();
const PORT = 8000;
// 

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


let prod = new ProductosDao;
let msg = new MensajesDao;


io.on("connection", async (socket) => {
    console.log("el usuario con el id: " + socket.id + " se ha conectado.");

    let productos = await prod.listarAll();
    let mensajes = await msg.normalize();

    //CHAT SOCKETS
    socket.emit("messages", mensajes);
    
    socket.on("new-message", async (data) => {
        try {
            await msg.createMsg(data);
            console.log("entro aqui   ",data);

            io.sockets.emit("messages", mensajes)
        } catch (err) {
            console.log("error", err);
        }
    });

    //PROD SOCKETS
    socket.emit("productos", productos);
    
    socket.on("new-product", async (data) => {
        // productos.push(data);
        await prod.guardar(data);
        io.sockets.emit("productos", productos);
    });
    socket.on("randomProd", async (data) => {
        await prod.guardar(data);
        io.sockets.emit("productos", productos);
    })
    
}) 


//CONFIG EJS

app.set("view engine", "ejs");
app.set("views", "./views");

app.set("socketio", io);
app.use(express.static("./public"));
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname })
});


app.use("/", router);
app.use("/api.productos-test", prodRouter);


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/api/productos-test", (req, res) => {
    let response = [];
    for (let index = 0; index <= 5; index++) {
        response.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        });
    }

    res.render('vista.ejs', { response: response })
})
router.post("/", (req, res) => {
	const producto = req.body;
	prod.guardar(producto);
	res.redirect("/");
});

prodRouter.post("/", async (req, res) => {
    let response = [];
    for (let index = 0; index <= 5; index++) {
        response.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        });
    }
    console.log(response)
    prod.guardar(response)
    res.redirect("/api/productos-test");
});

const connectedServer = httpServer.listen(PORT, () => {
    console.log("Server On")
});    