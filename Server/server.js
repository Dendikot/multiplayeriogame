import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import cors from 'cors';
import GameObject from './public/js/gameObject.js';

const app = express();
const http = createServer(app);
const cor = cors();
const game = new GameObject();

app.use(cor);
app.use(express.static('public'));

const io = new Server(http, {
	cors: {
		origin: 'http://localhost:8080',
		methods: ["GET", "POST"]
	}
});

let pictureValue = 0;

let participatedUsers = [];

io.on('connection', (socket) => {

	//participatedUsers[socket.id] = new gameObjectBase();

	socket.on('test', () => {
		io.emit("testback");
	});

	// how do I receive the data accordingly to each separate socket
	// by using their socket id as index and directly changing the data in
	socket.on('move', (xValue) => {
			pictureValue = xValue;
		}
	)

});

http.listen(3000, () => {
	console.log("server started!!");
})

// I emit the data about the whole map to all socket players and they recreate it on their side
//
const interval = setInterval(() => {
	io.emit('frame', pictureValue);
}, 10);

// set up the webpack based middle ware server
// make commit
