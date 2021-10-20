//object for each player
export default class GameObject {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	movePlayer(x, y) {
		this.x += x;
		this.y += y;
		console.log('x ' + x);
		console.log('y ' + y);
	}


}
