const express = require("express");
const http = require("http");
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static(".")); // serve all static files


io.on("connection", (socket) => {
socket.on("join-room", (roomId) => {
socket.join(roomId);
socket.to(roomId).emit("user-joined", socket.id);


socket.on("signal", ({ to, data }) => {
io.to(to).emit("signal", { from: socket.id, data });
});


socket.on("disconnect", () => {
socket.to(roomId).emit("user-left", socket.id);
});
});
});


server.listen(3000, () => console.log("Server running on 3000"));
