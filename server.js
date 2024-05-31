// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const players = [];
// Manejo de conexiones de sockets
io.on('connection', (socket) => {
  console.log('Nuevo jugador conectado');

  // Manejo del disparo
  socket.on('shoot', (coordinates) => {
    console.log('Jugador disparó en:', coordinates);
    // Envía las coordenadas del disparo a todos los jugadores
    io.emit('shotFired', coordinates);
  });

  //manjeo lista de jugadores

    socket.on('newPlayer', (player) => {
        console.log('Nuevo jugador:', player);
        players.push(player);

        // Envía la lista de jugadores a todos los jugadores
        io.emit('players', players);
    });
});



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
