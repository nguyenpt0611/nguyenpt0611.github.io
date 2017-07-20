//get element background canvas
var bgcanvas= document.getElementById("bgcanvas");
var ctx_bg= bgcanvas.getContext("2d");
//get element main canvas
var container = document.getElementById("maincanvas");
var ctx = container.getContext("2d");
//get element menu canvas
var menu= document.getElementById("menu");
ctxMenu = menu.getContext("2d");

const FPS = 200;
//frame per second
const TICKS = 1000 / FPS;

//level monster
var levelArr = [ 1, 2, 3, 4]; 
var level;
var score;
var heart;
var numberBoom;
//status game
var running;
//number of monster was killed
var kill_index = 0;
//requestAnimation API
var _reqAnimation;
//timeout for update
var lastUpdateTime = Date.now();
//Array monster object
var monster = [];
/**
 * Class Monster
 * 
 */
function Monster(initX, initY, x, y, destX, destY, initToX, initToY, destroy, destroyX, destroyY, visible) {
	this.initX = initX;   //position x default
	this.initY = initY;   //position y default
	this.x = x;       //position x current
	this.y = y;       //position y current
	this.destX = destX;     //move from position x
	this.destY = destY;     //move from position y
	this.initToX = initToX; //move to position x default
	this.initToY = initToY; //move to position y default
	this.destroy = destroy;     //boolean destroy
	this.destroyX = destroyX;    //position x when destroy
	this.destroyY = destroyY;    //position y when destroy
	this.visible = visible; //boolean visible
}
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

	// // //disable monster
	if (this.x == this.initX && this.y == this.initY) {
		score -= 10;
		killMonster(this);

		if (heart > 0) {
			heart--;
			randomMonster();
		}
		else {
			running = false;
		}
	}

};
function killMonster(monster) {
	monster.x = monster.initX;
	monster.y = monster.initY;
	monster.destX = monster.initToX;
	monster.destY = monster.initToY;
	monster.visible = false;
}
//create monster by level
function randomMonster() {
	for(var i=0;i<level;i++) {
		var random = Math.floor((Math.random() * 8) + 0);
		if (!monster[random].visible) {
			monster[random].visible = true;
		}
	}
	
}
/*-------- Kill monster by click event -----*/
//get position of cursor
$(document).ready(function() {
	$("#maincanvas").mousedown(function(e){
	var flag = 0;
	preX = e.pageX - this.offsetLeft;
         	preY = e.pageY - this.offsetTop;
         	if (running) {
         		for (var i = 0; i < monster.length; i++) {
			if (monster[i].visible) {
				if (preX>monster[i].x && preX<monster[i].x+100 && preY>monster[i].y && preY<monster[i].y+100) {
					killMonster(monster[i]);
					score += 10;
					kill_index++;
					if(kill_index == level*10) {
						level++; 
					}
					flag++;
					randomMonster();
				}
			}
		}
		if (flag == 0) {
			score -= 10;
		}
         	}
	});
	//button on menu
	$("#menu").mousedown(function(e){
	preX = e.pageX - this.offsetLeft;
         	preY = e.pageY - this.offsetTop;
         	//
         	if (running) {
		if (preX>280 && preX<320 && preY>50 && preY<90) {
			if (numberBoom>0) {
				numberBoom--;
				for (var i = 0; i < monster.length; i++) {
					if (monster[i].visible) {
						killMonster(monster[i]);
						score += 10;
						kill_index++;
					}
				}
			}
			if(kill_index == level*10) {
				level++; 
			}
			randomMonster();
		}
		if(preX>445 && preX<485 && preY>50 && preY<90) {
			startGame();
		}
	}
	});
	render_menu();

});

function startGame() {
	level = 1;
	score = 0;
	heart = 5;
	numberBoom = 100;
	running = true;
	//Init object monster form class Monster
	var monster1 = new Monster(0, 0, 0, 0, 120, 120, 120, 120, false, 0, 0, false);
	var monster2 = new Monster(210, 0, 210, 0, 210, 120, 210, 120, false, 0, 0, false);
	var monster3 = new Monster(420, 0, 420, 0, 300, 120, 300, 120, false, 0, 0, false);
	var monster4 = new Monster(0, 210, 0, 210, 120, 210, 120, 210, false, 0, 0, false);
	var monster5 = new Monster(420, 210, 420, 210, 300, 210, 300, 210, false, 0, 0, false);
	var monster6 = new Monster(0, 420, 0, 420, 120, 300, 120, 300, false, 0, 0, false);
	var monster7 = new Monster(210, 420, 210, 420, 210, 300, 210, 300, false, 0, 0, false);
	var monster8 = new Monster(420, 420, 420, 420, 300, 300, 300, 300, false, 0, 0, false);
	monster = [monster1, monster2, monster3, monster4, monster5, monster6, monster7, monster8];
	randomMonster();
	main();
}
function moveMonster(time) {
	for(var i = 0; i < monster.length; i++) {
		if (monster[i].visible) {
			monster[i].move();
		}
	}
	_reqAnimation(main);
}
function main() {
	render();
	if (running) {
		var now = Date.now();
		var differentTime = now - lastUpdateTime;
		if (differentTime >= TICKS) {
			//clear main canvas then re-draw
			ctx.clearRect(0,0,500,500);
			render_container();
			lastUpdateTime = now;
		}
		console.log(differentTime + " - " + level);
		_reqAnimation = window.requestAnimationFrame ||
			    window.mozRequestAnimationFrame ||
			    window.webkitRequestAnimationFrame ||
			    window.msRequestAnimationFrame ||
			    window.oRequestAnimationFrame;
		if (_reqAnimation) {
			moveMonster();
		}
		else {
			alert("Your browser doesn't support requestAnimationFrame.");
		}
	}
	
};
//running game
startGame();

//render UI for game
function render_menu() {
	//define pen text for menu
	ctxMenu.font = "25px Arial";
	ctxMenu.fillStyle = "#fff";

	/*----------  Menu canvas  ----------*/
	//background
	var img_bgmenu= new Image();
	img_bgmenu.onload = function() {
		ctxMenu.drawImage(img_bgmenu, 0, 0,500,100);
	}
	img_bgmenu.src = "images/bg_menu.jpg";
	//heart
	var img_heart= new Image();
	img_heart.onload = function() {
		ctxMenu.fillText(" Heart", 10, 30);
		for (var i=0;i<heart;i++) {
			ctxMenu.drawImage(img_heart, 90+i*30,5,25,25);
		}
		ctxMenu.fillText("Score: " + score, 10, 60);
		ctxMenu.fillText(" Level: " + level, 10, 90);
	}
	//use onload for display text
	// window.onload = function() {
	// 	ctxMenu.fillText("Score: " + score, 10, 60);
	// 	ctxMenu.fillText(" Level: " + level, 10, 90);
	// }
	img_heart.src = "images/heart.png";
	/*----------  Button on menu  ----------*/
	//Boom
	var img_boom = new Image();
	img_boom.onload = function() {
		ctxMenu.fillText(numberBoom, 310, 60);
		ctxMenu.drawImage(img_boom, 280, 50, 40, 40);
	}
	img_boom.src = "images/boom.png";
	//Stop
	var img_stop = new Image();
	img_stop.onload = function() {
		ctxMenu.drawImage(img_stop, 335, 50, 40, 40);
	}
	img_stop.src = "images/stop.png";
	//Pause
	var img_pause = new Image();
	img_pause.onload = function() {
		ctxMenu.drawImage(img_pause, 390, 50, 40, 40);
	}
	img_pause.src = "images/pause.png";
	//restart
	var img_restart = new Image();
	img_restart.src = "images/restart.png";
	ctxMenu.drawImage(img_restart, 445, 50, 40, 40);
	// img_restart.onload = function() {
		
	// }
	
	/*----------  End of Button on menu  ----------*/
	/*----------  End Menu canvas  ----------*/
}

function render_bgcanvas() {
	//background
	var img_bg= new Image();
	img_bg.onload = function(){
		//đặt hàm vẽ trong load của image
		ctx_bg.drawImage(img_bg, 0,0,500,500);
	};
	//gán path sau khi load function được gọi
	img_bg.src = "images/background.jpg";
}

function render_container() {
	render_menu();
	/*----------  Container canvas  ----------*/
	var img_monster = new Image();
	img_monster.src = "images/monster.png";
	for(var i = 0; i < 8; i++) {
		if (monster[i].visible) {	
				ctx.drawImage(img_monster, monster[i].x, monster[i].y, 100, 100);	
			
		}
	}
	/*----------  End Container canvas  ----------*/
}

function render() {
	render_bgcanvas();
}
