import io from 'socket.io-client';

export default class SocketHandler {
	constructor(game) {
		this.game = game;
		this.socket = io('http://localhost:3000');

		this.socket.emit("startGame");
		this.socket.on('connect', () => {
			this.game.addPlayer(this.socket.id);
		});

		this.socket.on('receiveCurrentPlayers', (array) => {
			for (let player in array){
				this.game.addPlayer(player.id);
			}
		});

		this.socket.on('frame', (dataJson) => {
			this.manageData(dataJson);
		});


		this.socket.on("newPlayer", (id) => {
			this.game.addPlayer(id);
			console.log("new player");
		});

		this.socket.on("playerDisconnected", (id) => {
			this.game.removePlayer(id);
		});
	}

	basicEmit() {
		this.socket.emit("test");
		console.log("basic emit method called");
	}

	moveEmit(xVal, yVal) {
		this.socket.emit("input", xVal, yVal);
	}

	manageData(dataJson) {
		const object = JSON.parse(dataJson);
	}
}


// create a new project set up from the webpack example
// repeate all the nessesary parts except the ones that require not nessesary dependecies
// recreate set up and then proceed with game logic
