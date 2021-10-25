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
			case "Right":
				this.moveX = 1;
				break;
			case "Up":
				this.moveY = -1;
				break;
			case "Down":
				this.moveY = 1;
				break;
			case "StopHorizontal":
				this.moveX = 0;
				break;
			case "StopVertical":
				this.moveY = 0;
				break;
			default:
				break;
		}
	}

	test(){
		console.log("test");
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
