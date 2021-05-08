import dotenv from 'dotenv';
import SocketIO from 'socket.io'

dotenv.config();
import { startConnection } from './database'

import app from './app';
import { idText, isConstructorDeclaration } from 'typescript';
import { createServer } from "http";
import { Server, Socket } from "socket.io";


var express = require('express');
const server = createServer(app);
//var server = require('http').Server(app);
//const https = require("https"),
//  fs = require("fs");
//const server = https.createServer(Option, app).listen(8100);

//var socket = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });
//const io = new Server(server);

var messages = [{
    id:1,
    text: "Nombre",
    author: "Texto de prueba"
}];

io.on('connection', (socket:Socket) => {
    console.log("nueva conexion");
    socket.on('new-message', function(data) {
        console.log('el objeto que me lo entrega es: ',data);
        messages.push(data);
        io.sockets.emit('messages', messages);
         
          
    });
    socket.on('disconnect', function () {
        console.log('Se ha desconectado alguien');
    });
});
function init() {
    startConnection();
    //app.listen(app.get('port'));
    //console.log('Server on port', 3000);
    server.listen(3000, function() {
        console.log("servidor corriendo en en puerto 3000");
    });
};

init();