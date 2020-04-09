'use strict';

const socket = io();
const messageForm = document.getElementById('input-form');
const messageInput = document.getElementById('txt-input');
const messages = document.getElementById('msg-field');

const appendMessage = (message) => {
    const mE = document.createElement('div');
    mE.innerText = message;
    messages.append(mE);
};


const name = prompt('Enter a username');
appendMessage('Connected');
socket.emit('new-user', name);

socket.on('chat-message', data =>{
    appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name =>{
    appendMessage(`${name} Connected`);
});

messageForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    const message = messageInput.value;
    socket.emit('chat-message', message);
    messageInput.value = '';
});
