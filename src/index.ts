import dotenv from 'dotenv';
dotenv.config();
import { startConnection } from './database'
import app from './app';
import { idText, isConstructorDeclaration } from 'typescript';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
var express = require('express');
const server = createServer(app);
import user, {IUser} from './models/user'
const io = new Server(server, { cors: { origin: '*' } });
//const io = new Server(server);
let userX: IUser;
let ListaUser: Map<string, IUser> = new Map();
var i= [];

var messages = ['bienvenidos al chat'];
io.on('connection', (socket:Socket) => {
    let username: string;
    let id: number;
    console.log("nueva conexion");
    socket.on('me-conecto', function(data) {
        userX = data;
        username= userX.username;
        id= userX._id;
        ListaUser.set(username, userX)
        console.log("El usuario es ", userX);
        io.emit('listausuarios', Array.from(ListaUser.values()))      
    });
    socket.on('new-message-g', function(data) {
        messages.push(data)
        while(messages.length>20){
            messages.shift()
        }
        console.log(messages);
        io.sockets.emit('messages', messages);     
    });
    socket.on('disconnect', function () {
        if(username){
            console.log('Se ha desconectado: ', username);
            ListaUser.delete(username)
            io.emit('listausuarios', Array.from(ListaUser.values()))

        }
    });
});
function init() {
    let usuarios: IUser[] = [];
    startConnection();
    //app.listen(app.get('port'));
    //console.log('Server on port', 3000);
    server.listen(3000, function() {
        console.log("servidor corriendo en en puerto 3000");
    });
};

init();