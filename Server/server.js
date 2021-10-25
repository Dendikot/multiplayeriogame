import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import cors from 'cors';
import GameObject from './public/js/gameObject.js';

const app = express();
const http = createServer(app);
const cor = cors();

app.use(cor);

const io = new Server(http, {
	cors: {
		origin: 'http://localhost:8080',
		methods: ["GET", "POST"]
	}
});

let participatedUsers = {};
let sockets = [];


io.on('connection', (socket) => {
	sockets.push(socket);
	participatedUsers[socket.id] = new GameObject(0, 0);
	io.emit("receiveCurrentPlayers", participatedUsers);

	socket.on("Input", (direction) => {
		if (participatedUsers[socket.id]) {
			participatedUsers[socket.id].movePlayer(direction);
		}
	});

	socket.on('disconnect', () => {
		delete participatedUsers[socket.id];
		socket.broadcast.emit("playerDisconnected", socket.id);
		const index = sockets.indexOf(socket);
		sockets.splice(index, 1);
	});
});


http.listen(3000, () => {
	console.log("server started!!");
})

// Data emit interval
const interval = setInterval(() => {
	const object = JSON.stringify(participatedUsers);
	io.emit('frame', object);
}, 34);

// Physics interval
let lastUpdateTime = Date.now();
//request animation frame seems to be not possible here so it should be replaced.
// update is not working

setInterval(render, 1000/60);

function render() {
	const now = Date.now();
	const dt = (now - lastUpdateTime) / 1000;
	lastUpdateTime = now;
	for (let player in participatedUsers) {
		participatedUsers[player].update(dt);
	}
}
// why only first player received the updates correctly?
// probably the overall connection logic at the beginning

// think of how to send data correctly
