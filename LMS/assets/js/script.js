//const socket = io('http://localhost:8080')
const socket = io('https://localhost:8080', { transports : ['websocket'] });

socket.on('chat-message',data=>{
    console.log(data)
})