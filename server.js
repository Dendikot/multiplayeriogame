const server = require('express')();
const http = require('http').createServer(server);

const cors = require('cors');


const io = require('socket.io')(http, {
	cors: {
		origin: 'http://localhost:8080',
		methods: ["GET", "POST"]
	}
});

io.on('connection', (socket) => {
	console.log("user connected " + socket.id);
});

http.listen(3000, () => {
	console.log("server started!!");
})
