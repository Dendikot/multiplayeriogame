import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import SocketHandler from "./js/SocketHandler";

class MyGame extends Phaser.Scene {
	constructor() {
		super();
	}

	preload() {
		this.load.image('logo', logoImg);
		this.socketHnadler = new SocketHandler(2, this);
	}

	create() {
		this.logo = this.add.image(400, 150, 'logo');
		console.log(this.logo);
		this.tweens.add({
			targets: this.logo,
			y: 450,
			duration: 2000,
			ease: "Power2",
			yoyo: true,
			loop: -1
		});

		this.scene.scene.input.keyboard.on('keydown-' + 'D', () => {
			this.socketHnadler.moveEmit(1);
		});
		this.scene.scene.input.keyboard.on('keydown-' + 'A', () => {
			this.socketHnadler.moveEmit(-1);
		});
	}

	updateLogoPos(xValue) {
		this.logo.x += xValue;
		console.log(this.logo.x);
	}

	update(time, delta) {
		super.update(time, delta);
	}
}

const config = {
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 800,
	height: 600,
	scene: MyGame
};

const game = new Phaser.Game(config);
