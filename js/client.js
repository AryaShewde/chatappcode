// const socket = io('http://localhost:8000');
const socket = io('http://localhost:8000',{transports:['websocket']})
const form = document.getElementById('send-container')
const messageinput = document.getElementById('messageimp')
const messagecontainer = document.querySelector(".container")
var ting = new Audio('../Message.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement)
    if (position == 'left') {
        ting.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message)
    messageinput.value = "";
})
const ame = prompt("Enter your name to join");
socket.emit('new-user-joined', ame)
socket.on('user-joined', ame=>{
    append(`${ame} : joined the chat`, 'right')
})
socket.on('receive', data=>{
    append(`${data.ame}: ${data.message}`, 'left')
})
socket.on('left', ame=>{
    append(`${ame} : Left the chat`, 'right');
})