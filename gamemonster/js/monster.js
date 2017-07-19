//get element main canvas
var container = document.getElementById("container");
var ctx = container.getContext("2d");
//get element menu canvas
var menu= document.getElementById("menu");
ctxMenu = menu.getContext("2d");

const FPS = 60;
//frame per second
const TICKS = 1000 / FPS;

var score = 0;
var heart = 5;
//level monster
var levelArr = [ 2, 4, 6, 10]; 
var level = 2;
var numberBoom = 3;
var running = true;

var _reqAnimation;
/**
 * Class Monster
 * 
 */
function Monster(initX, initY, x, y, destX, destY, initToX, initToY, destroy, destroyX, destroyY, visible) {
	this.initX = initX;   //position x default
	this.initY = initY;   //position y default
	this.x = x;       //position x current
	this.y = y;       //position y current
	this.destX = destX;     //move to position x
	this.destY = destY;     //move to position y
	this.initToX = initToX; //move to position x default
	this.initToY = initToY; //move to position y default
	this.destroy = destroy;     //boolean destroy
	this.destroyX = destroyX;    //position x when destroy
	this.destroyY = destroyY;    //position y when destroy
	this.visible = visible; //boolean visible
}

Monster.prototype.draw= function() {
	//monster

	img_monster.onload = function(){
		//đặt hàm vẽ trong load của image
		ctx.drawImage(img_monster, this.x, this.y);
	};
	//gán path sau khi load function được gọi
	img_monster.src = "images/monster.png";
}
//Init object monster form class Monster
var monster1 = new Monster(0, 0, 0, 0, 120, 120, 120, 120, false, 0, 0, false);
var monster2 = new Monster(210, 0, 210, 0, 210, 120, 210, 120, false, 0, 0, false);
var monster3 = new Monster(420, 0, 420, 0, 300, 120, 300, 120, false, 0, 0, false);
var monster4 = new Monster(0, 210, 0, 210, 120, 210, 120, 210, false, 0, 0, false);
var monster5 = new Monster(420, 210, 420, 210, 300, 210, 300, 210, false, 0, 0, false);
var monster6 = new Monster(0, 420, 0, 420, 120, 300, 120, 300, false, 0, 0, false);
var monster7 = new Monster(210, 420, 210, 420, 210, 300, 210, 300, false, 0, 0, false);
var monster8 = new Monster(420, 420, 420, 420, 300, 300, 300, 300, false, 0, 0, false);
//Array monster object
var monster = [monster1, monster2, monster3, monster4, monster5, monster6, monster7, monster8];
//Method move monster
Monster.prototype.move = function() {

	if (this.x == this.destX && this.y == this.destY) {
		this.x = this.destX;
		this.y = this.destY;
		this.destX = this.initX;
		this.destY = this.initY;
	}

	if (this.x < this.destX) {
		this.x += level;
	} else if (this.x > this.destX) {
		this.x -= level;
	}
	if (this.y < this.destY) {
		this.y += level;
	} else if (this.y > this.destY) {
		this.y -= level;
	}
	//disable monster
	if (this.x == this.initX && this.y == this.initY) {
		this.visible = false;
		this.x = this.initX;
		this.y = this.initY;
		this.toX = this.initToX;
		this.toY = this.initToY;
		//score -= 10;
		//randomMonster();
	}
};

function update(time) {
	monster1.move();
	monster1.draw();
	_reqAnimation(update);
}
window.onload = function(){
	render();
	_reqAnimation = window.requestAnimationFrame ||
		    window.mozRequestAnimationFrame ||
		    window.webkitRequestAnimationFrame ||
		    window.msRequestAnimationFrame ||
		    window.oRequestAnimationFrame;
	if (_reqAnimation) {
		update();
	}
	else {
		alert("Your browser doesn't support requestAnimationFrame.");
	}
};
function render() {
	/*----------  Menu canvas  ----------*/
	//heart
	var img_heart= new Image();
	img_heart.onload = function(){
		//đặt hàm vẽ trong load của image
		ctxMenu.drawImage(img_heart,90,5,25,25);
	};
	//gán path sau khi load function được gọi
	img_heart.src = "images/heart.png";
	//heart img
	// var xH = 90;
	// for(h = 1; h <= heart; h++) {
	// 	ctxMenu.drawImage(heartImage, xH, 15);
	// 	xH += 34;
	// }

	/*----------  Button on menu  ----------*/
	//Boom
	var img_boom = new Image();
	img_boom.onload = function(){
		//đặt hàm vẽ trong load của image
		ctxMenu.drawImage(img_boom, 280, 50, 40, 40);
	};
	img_boom.src = "images/boom.png";
	

	//Stop
	var img_stop = new Image();
	img_stop.onload = function(){
		//đặt hàm vẽ trong load của image
		ctxMenu.drawImage(img_stop, 335, 50, 40, 40);
	};
	img_stop.src = "images/stop.png";
	//Pause
	var img_pause = new Image();
	img_pause.onload = function(){
		//đặt hàm vẽ trong load của image
		ctxMenu.drawImage(img_pause, 390, 50, 40, 40);
	};
	img_pause.src = "images/pause.png";
	//Restart
	var img_restart = new Image();
	img_restart .onload = function(){
		//đặt hàm vẽ trong load của image
		ctxMenu.drawImage(img_restart, 445, 50, 40, 40);
	};
	img_restart.src = "images/restart.png";
	/*----------  End of Button on menu  ----------*/

	//render text for menu
	ctxMenu.font = "25px Arial";
	ctxMenu.fillStyle = "#fff";
	//Heart
	ctxMenu.fillText(" Heart", 10, 30);
	//Score
	// ctxMenu.fillText("Score: " + score, 10, 70);
	ctxMenu.fillText("Score", 10, 60);
	//level of game
	ctxMenu.fillText(" Level", 10, 90);
	//Number Boom
	ctxMenu.fillText("3", 310, 60);
	/*----------  End Menu canvas  ----------*/


	/*----------  Container canvas  ----------*/
	

	//background
	var img_bg= new Image();
	img_bg.onload = function(){
		//đặt hàm vẽ trong load của image
		ctx.drawImage(img_bg, 0,0,500,500);
	};
	//gán path sau khi load function được gọi
	img_bg.src = "images/background.jpg";

	// var img_monster= new Image();
	// img_monster.onload = function(){
	// 	ctx.drawImage(img_monster,monster1.x,monster1.y);
	// }
	// img_monster.src = "images/monster.png";

	/*----------  End Container canvas  ----------*/
}

