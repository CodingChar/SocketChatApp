const socket = io();

const display = document.querySelector(".display");
const sendBtn = document.querySelector(".btn-send");


socket.on("server-message", (data) => {
  console.log(data)
  displayMessage(data);
});


function message(e){
  e.preventDefault()
  let messageContent = document.querySelector('.chat-input')
  console.log('click')
  sendMessage({
    username: "From Server",
    message: messageContent.value
  })
  messageContent.value = ""
}

sendBtn.addEventListener('click', message)
document.addEventListener('keydown', e => {
  if(e.key == "Enter") message(e)
})

function displayMessage(data) {
  const div = document.createElement("div");
  div.innerHTML = `<span><b>${data.username}</b>-> ${data.message}</span>`;
  display.appendChild(div)
}

function sendMessage(data) {
  socket.emit("chat-message", data);
}
