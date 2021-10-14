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
	}

	basicEmit(){
		this.socket.emit("test");
		console.log("basic emit method called");
	}

	moveEmit(xVal){
		this.socket.emit("move", xVal);
	}



}
