const server = require('express')();
const http = require('http').createServer(server);

const cors = require('cors');


const io = require('socket.io')(http, {
	cors: {
		origin: 'http://localhost:8080',
		methods: ["GET", "POST"]
	}
});

let pictureValue = 0;

io.on('connection', (socket) => {

	socket.on('test', () => {
		io.emit("testback");
	});

	socket.on('move', (xValue) => {
			pictureValue += xValue;
			io.emit("moved", pictureValue);
		}
	)
});

http.listen(3000, () => {
	console.log("server started!!");
})

const interval = setInterval(() => {
	io.emit('frame');
}, 200);
