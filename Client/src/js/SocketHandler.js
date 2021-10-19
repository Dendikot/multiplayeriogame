import io from 'socket.io-client';

export default class SocketHandler {
	constructor(id, game) {
		this.socket = io('http://localhost:3000');
		console.log(this.socket);

		this.socket.on('connect', () => {
			console.log("connected i guess");
		})

		this.socket.on("testback", ()=>{
			console.log("bck");
		});

		this.socket.emit("startGame");

		this.socket.on("moved", (xValue)=>{
			game.updateLogoPos(xValue);
		});

		this.socket.on('frame', (xValue)=>{
			game.updateLogoPos(xValue);
		});
	}

	basicEmit(){
		this.socket.emit("test");
		console.log("basic emit method called");
	}

	moveEmit(xVal){
		this.socket.emit("move", xVal);
	}
}


// create a new project set up from the webpack example
// repeate all the nessesary parts except the ones that require not nessesary dependecies
// recreate set up and then proceed with game logic
