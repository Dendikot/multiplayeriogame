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

io.on('connection', (socket) => {

	participatedUsers[socket.id] = new GameObject(0, 0);

	socket.on("Input", (x, y) => {
		if (participatedUsers[socket.id]) {
			participatedUsers[socket.id].movePlayer(x, y);
		}
	});

	socket.on('disconnect', () => {
		delete participatedUsers[socket.id];
		socket.broadcast.emit("playerDisconnected", socket.id);
	});

	socket.broadcast.emit('newPlayer', socket.id);
});

http.listen(3000, () => {
	console.log("server started!!");
})

// I emit the data about the whole map to all socket players and they recreate it on their side
//
const interval = setInterval(() => {
	const object = JSON.stringify(participatedUsers);
	io.emit('frame', object);
}, 10);


// on player creation receive the data about all current existing players and create needed graphics
