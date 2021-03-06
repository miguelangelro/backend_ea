import dotenv from 'dotenv';
dotenv.config();
import { startConnection } from './database'
import app from './app';
import { idText, isConstructorDeclaration } from 'typescript';
import { createServer } from "http";
import { Server, Socket } from "socket.io";


var express = require('express');
const server = createServer(app);
import User, {IUser} from './models/user'
const io = new Server(server, { cors: { origin: '*' }, allowEIO3: true });
//const io = new Server(server);
let userX: IUser;
let ListaUser: Map<string, IUser> = new Map();
var i= [];
var nsala = 0;
var aceptar;
var hab;
var sec;
let listaAmigos: [];
let listaAmigosEnviar: IUser[];

var messages = ['bienvenidos al chat'];
io.on('connection', (socket:Socket) => {
    let username: string;
    let id: number;
    console.log("nueva conexion");
    socket.on('me-conecto', function(data) {
        userX = data;
        username= userX.username;
        io.sockets.emit('refresh')
        id= userX._id;
        ListaUser.set(username, userX)
        console.log("El usuario es ", userX);
        io.emit('listausuarios', Array.from(ListaUser.values()))
        io.sockets.emit('messages', messages); 
    });

    socket.on('new-message-g', function(data) {
        messages.push(data)
        while(messages.length>50){
            messages.shift()
        }
        console.log(messages);
        io.sockets.emit('messages', messages);     
    });

    socket.on('invitacion', function(data) {
        hab =  String(nsala)
        socket.join(hab);
        console.log(data)
        socket.emit('numero', nsala)
        io.sockets.emit('invitacion2', data, nsala);
        nsala++;
        console.log('el numero de salas activas es: ' + nsala)    
    });
    socket.on('nsala', function(data) {
        console.log(data)
        hab =  String(data)
        socket.join(hab);
        socket.emit('numero', data)   
    });
   
    socket.on('mensajesPriv',function (data, data2) {
        hab =  String(data2)
        io.sockets.to(hab).emit('mensajeSala', data);
        console.log(" mensaje: ",data);
        console.log("numero de sala:", hab)
        
       
    });
    
    socket.on('miamigo', function(data){
        console.log(userX)
        console.log('lista amigos', userX.amigos);
        console.log("paso por aqui")
        socket.emit('refresh')
    });
    socket.on('ramigo', function(data){
        listaAmigos = data
        console.log(listaAmigos)
        socket.emit('refresh2', listaAmigos)
    });

    
    
    socket.on('disconnect', function () {
        if(username){
            const userUpdated = User.findByIdAndUpdate(userX.id, {$set: {conectado: 0}})
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
    server.listen(app.get('port'), function() {
        console.log("servidor corriendo en en puerto 3000");
    });
};

init();