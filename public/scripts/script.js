const socket = io();

const display = document.querySelector(".display");
const sendBtn = document.querySelector(".btn-send");
const connectBtn = document.querySelector('.btn-connect')

function changeConnect(e){
  if(connectBtn.value == "Connect"){
    socket.disconnect();
    connectBtn.value = "Disconnected"
  }else{
    socket.connect();
    connectBtn.value = "Connect"
  }
}
function createUser(name){
  if(!localStorage.getItem('chat-user')){
    const randomCode = Math.floor(Math.random()*400)
    let user = name+randomCode;
    localStorage.setItem('chat-user', user)

    alert(`Your user from now and on, Will be ${user}`)
    return user;
  }else{
    return localStorage.getItem('chat-user')
  }
}

socket.on('number-clients', data => {
  document.querySelector('.server-info p').innerText ='Users Online: '+data;
})

socket.on("server-message", (data) => {
  console.log(data)
  displayMessage(data);
  window.scrollTo(1, document.body.scrollHeight);
});


function message(e){
  e.preventDefault()


  let messageContent = document.querySelector('.chat-input')
  
  console.log('click')
  if(messageContent.value.length <= 0){
    alert("No empty messages!")
    return;
  }else if(messageContent.value.length >= 80){
    alert("Limit exceded, 40 characters or less")
    return;
  }
  
  sendMessage({
    username: createUser('User'),
    message: messageContent.value
  })
  messageContent.value = ""
}

sendBtn.addEventListener('click', message)
connectBtn.addEventListener('click', changeConnect);

document.addEventListener('keydown', e => {
  if(e.key == "Enter") message(e)
})

function displayMessage(data) {
  const div = document.createElement("li");
  div.innerHTML = `<span><b>${data.username}</b>-> ${data.message}</span>`;
  display.appendChild(div)
}

function sendMessage(data) {
  socket.emit("chat-message", data);
}
