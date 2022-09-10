const express = require('express');
const app = express();
const { Server } = require("socket.io");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set("view engine","ejs");

app.get("/", (req,res) => {
    res.render("index")
})

const serverExpress = app.listen(3001, () => console.log("Server running on port 3001"))

const io = new Server(serverExpress,{
    maxHttpBufferSize: 1e8
});


//pingTimeout: 60 000
//maxPayload
//maxPayload {Number} The maximum allowed message size in bytes. Defaults to 100 MiB (104857600 bytes).

var uploadedFiles = [];

io.on("connection", socket => {
    socket.on("chat:whatsfile", (argv) => {
        uploadedFiles.push({...argv});
        io.emit("chat:listfiles", uploadedFiles)
    })
})