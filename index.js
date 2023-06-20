const io = require('socket.io')(8000)
const express = require('express')
const users ={};

io.on('connection', socket =>{
    socket.on('new-user-joined', ame =>{
        users[socket.id] = ame;
        socket.broadcast.emit('user-joined', ame);
    });
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, ame: users[socket.id]})
    });
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});