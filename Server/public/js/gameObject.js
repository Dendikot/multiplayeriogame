//object for each player
export default class GameObject {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.moveX = 0;
		this.moveY = 0;
	}

	movePlayer(direction) {
		switch (direction) {
			case "Left":
				this.moveX = -1;
				break;
			default:
				break;
		}
	}

	update(delta) {
		if (this.moveX !== 0) {
			this.x += this.moveX * delta * 10;
		}
		if (this.moveY !== 0) {
			this.y += this.moveY * delta * 10;
		}
	}
}
