import io from 'socket.io-client';

export default class SocketHandler {
	constructor(game) {
		this.game = game;
		this.socket = io('http://localhost:3000');

		this.socket.emit("startGame");

		this.socket.on('receiveCurrentPlayers', (array) => {
			for (let player in array) {
				this.game.addPlayer(player);
			}
		});

		this.socket.on('frame', (dataJson) => {
			this.manageData(dataJson);
		});

		this.socket.on("playerDisconnected", (id) => {
			this.game.removePlayer(id);
		});


	}

	basicEmit() {
		this.socket.emit("test");
		console.log("basic emit method called");
	}

	moveEmit(direction) {
		this.socket.emit("Input", direction);
	}

	manageData(dataJson) {
		const object = JSON.parse(dataJson);
		for (let entry in object) {
			this.game.movePlayer(entry, object[entry].x, object[entry].y);
		}
	}
}


// create a new project set up from the webpack example
// repeate all the nessesary parts except the ones that require not nessesary dependecies
// recreate set up and then proceed with game logic
