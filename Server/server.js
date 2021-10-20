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
	socket.broadcast.emit("newPlayer", socket.id);
	io.to(socket.id).emit("receiveCurrentPlayers", participatedUsers);

	participatedUsers[socket.id] = new GameObject(0, 0);

	socket.on("Input", (direction) => {
		if (participatedUsers[socket.id]) {
			console.log("Call received on server side " + direction);
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
function render() {
	window.requestAnimationFrame(render);

	const now = Date.now();
	const dt = (now - lastUpdateTime) / 1000;
	lastUpdateTime = now;

	for (let player in participatedUsers) {
		participatedUsers.update(dt);
	}
}

// send the delta of the changed stuff instead
// send the world only once several ticks

// client side prediction

// use velocity instead of direct value
// interpolate as much as possible on a client side

//


// on player creation receive the data about all current existing players and create needed graphics
