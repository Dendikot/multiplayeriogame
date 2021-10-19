const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.static('public'));

const gm = require('./public/js/gameObject.js');
const gameObject = new gm();

const io = require('socket.io')(http, {
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
