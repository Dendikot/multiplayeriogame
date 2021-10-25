import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import SocketHandler from "./js/SocketHandler";

class MyGame extends Phaser.Scene {
	constructor() {
		super();
	}

	preload() {
		this.load.image('logo', logoImg);
		this.socketHandler = new SocketHandler(this);
	}

	create() {
		this.Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.Up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.Down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.HorizontalMove = false;
		this.VerticalMove = false;

		this.PlayersData = {};
	}

	updateLogoPos(users) {
		console.log(users);
		console.log(users[0]);
	}

	update(time, delta) {
		super.update(time, delta);

		this.handleInput();

	}

	handleInput(){
		if (Phaser.Input.Keyboard.JustDown(this.Left)){
			this.socketHandler.moveEmit( "Left");
			console.log("pressed left on client side");
		} else if(Phaser.Input.Keyboard.JustDown(this.Right)){
			this.socketHandler.moveEmit( "Right");
			console.log("pressed right on client side");
		} else if (this.HorizontalMove) {
			this.socketHandler.moveEmit( "StopHorizontal");
			this.HorizontalMove = false;
		}

		if (Phaser.Input.Keyboard.JustDown(this.Down)){
			this.socketHandler.moveEmit( "Down");
			console.log("pressed Down on client side");
		}
		if (Phaser.Input.Keyboard.JustDown(this.Up)){
			this.socketHandler.moveEmit( "Up");
			console.log("pressed left on client side");
		}
	}

	handleData(playerData, enemiesData){

	}

	addPlayer(id){
		if (!this.PlayersData[id]) {
			this.PlayersData[id] = this.createLogo();
		}
	}

	movePlayer(id, x, y){
		if (this.PlayersData[id] !== undefined) {
			this.PlayersData[id].x = x;
			this.PlayersData[id].y = y;
		}
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

//todo move player based on one click and stop moving based on button up
