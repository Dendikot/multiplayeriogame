import io from 'socket.io-client';

export default class SocketHandler {
	constructor(id) {
		this.socket = io('http://localhost:3000');
		console.log(this.socket);

		this.socket.on('connect', () => {
			console.log("connected i guess");
			this.socket.emit("hello", id);
		})

		this.socket.on("firstTurn", () => {
			console.log("firstTurn" + id);
		});




	}

}
