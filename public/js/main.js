const socket = io.connect();

socket.on("productos", (data) => {
    showProductos(data)
});

function showProductos(data) {
    const htmlProductos = data.map((prod) => {
        return `
        <tr><td>${prod.title}</td><td>$ ${prod.price}</td><td><img src="${prod.thumbnail}" width="50" alt="not found"></td></tr>
        `
    }).join(" ")
    document.getElementById("tableBodyProd").innerHTML = htmlProductos;
}
function addProduct() {
    console.log("holaaa");
    const producto = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    };
    socket.emit("new-product", producto);
    return false;
}

function randomItem(){
    const producto = {
        title: document.getElementsById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }

    socket.emit("randomProduct", producto)

}

socket.on("messages", (data) => {
    showMessages(data);
})

function showMessages(data) {
    alert(JSON.parse(data));
    const dataMsg = JSON.parse(data);
    console.log("esta es la data");
    const htmlMessages = dataMsg.map((msg) => {
        return `
        <div>
            <strong style="color: blue;">${msg.author}</strong>
            <em style="color: brown;">[${msg.date}] :</em>
            <em style="color: green;">${msg.text}</em>
        </div>
        `
    }).join(" ");

    document.getElementById("chatZone").innerHTML = htmlMessages;
}

function addMessages(e) {
    const mensaje = {
        author: document.getElementById("email").value,
        // date: new Date().toLocaleString(),
        text: document.getElementById("texto").value
    }
    socket.emit("new-message", mensaje);
    return false;
}

