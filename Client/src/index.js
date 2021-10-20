import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import SocketHandler from "./js/SocketHandler";

class MyGame extends Phaser.Scene {
	constructor() {
		super();
	}

	preload() {
		this.load.image('logo', logoImg);
		this.socketHnadler = new SocketHandler(this);
	}

	create() {
		this.scene.scene.input.keyboard.on('keydown-' + 'D', () => {
			this.socketHnadler.moveEmit(1, 0);
		});
		this.scene.scene.input.keyboard.on('keydown-' + 'A', () => {
			this.socketHnadler.moveEmit(-1, 0);
		});
		this.PlayersData = {};
	}

	updateLogoPos(users) {
		console.log(users);
		console.log(users[0]);
	}

	update(time, delta) {
		super.update(time, delta);
	}

	handleData(playerData, enemiesData){

	}

	addPlayer(id){
		this.PlayersData[id] = this.createLogo();
	}

	createLogo(){
		const logo = this.add.image(400, 150, 'logo');
		logo.scaleX = 0.5;
		logo.scaleY = 0.5;
		return logo;
	}

	removePlayer(id){
		if (this.PlayersData[id]) {
			this.PlayersData[id].destroy();
			delete this.PlayersData[id];
		}
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

// assign the player id so it will be possible to distinct it in the future
// by pressing buttons send the data and evaluate the correct socket data wich gets send back and updated on the
// cient side
