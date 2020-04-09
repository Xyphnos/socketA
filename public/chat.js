'use strict';

const socket = io();
const messageForm = document.getElementById('input-form');
const messageInput = document.getElementById('txt-input');
const messages = document.getElementById('msg-field');
const roomContainer = document.getElementById('room-container');


const appendMessage = (message) => {
    const mE = document.createElement('div');
    mE.innerText = message;
    messages.append(mE);
};

if(messageForm != null){
    const name = prompt('Enter a username');
    appendMessage('Connected');
    socket.emit('new-user', roomName, name);

    messageForm.addEventListener('submit', (event) =>{
        event.preventDefault();
        const message = messageInput.value;
        appendMessage(`you: ${message}`);
        socket.emit('chat-message', roomName, message);
        messageInput.value = '';
    });
}

socket.on('chat-message', data =>{
    appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name =>{
    appendMessage(`${name} Connected`);
});

socket.on('user-disconnected', name =>{
    appendMessage(`${name} Disconnected`);
});

socket.on('new-room', room =>{
    const rE = document.createElement('div');
    roomElement.innerText = room;
    const roomLink = document.createElement('a');
    roomLink.href = `/${room}`;
    roomLink.innerText = 'join';
    roomContainer.append(roomElement);
    roomContainer.append(roomLink);
});
