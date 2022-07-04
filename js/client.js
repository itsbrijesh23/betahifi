const socket = io();

const form = document.getElementById("send-container");
const messageInput =  document.getElementById("msgInp")
const messageContainer = document.getElementById("messagebox")
let audio0 = new Audio("/files/ting.mp3");
let audio1 = new Audio("/files/joinleave.mp3");


const append = (message,position)=>{
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);

    if(position=="left"){
        audio0.play();
    }
    if(position=="center"){
        audio1.play();
    }
}

form.addEventListener('submit',(evnt)=>{
    evnt.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`,'right' );
    socket.emit('send',message);
    messageInput.value="";
})

const username = prompt("Enter your name");

socket.emit("new-user-joined", username);
    
socket.on("user-joined", (username)=>{
    append(`${username} joined the chat`,"center");
})

socket.on("receive",(data)=>{
    append(`${data.username}: ${data.message }`,"left");
})

socket.on("user-left",(username)=>{
    append(`${username} left the chat 😔`,"center");
})

