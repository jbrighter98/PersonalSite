
var radius;

var g;

var pos;

var vel;

class Ball {
  constructor(){
    this.pos = createVector(width / 2, 300);
    vel = createVector(0, 0);
    this.radius = 100;
    g = createVector(0, 9.81 / 20);
  }

 display() {
    noStroke();
    fill(200, 0, 0);
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
  }

  fall() {
    vel.add(g);
    this.pos.add(vel);
  }

  kick(i) {
    var mouse = createVector(mouseX, mouseY);
    var temp = createVector(0, 0);
    temp.set(this.pos.x, this.pos.y);
    temp.sub(mouse);
    if (temp.y > 0) {
        var tempy = temp.y * -1;
        var tempx = temp.x;
        temp.set(tempx, tempy);
    }
    temp.setMag(i);
    vel.add(temp);
  }

  bounceWall(side) {
    var temp = createVector(0, 0);
    /*if(vel.x == 0) {
      temp.set(1+ (vel.x * -0.9), vel.y);
    } else {  
      temp.set(vel.x * -0.9, vel.y);
    }*/
    if (side == 1) {
        this.pos.set(width - this.radius / 2 - 1, this.pos.y);
    } else if (side == 0) {
        this.pos.set(this.radius / 2 + 1, this.pos.y);
    }
    temp.set(2 * vel.x * -0.9, 0);
    vel.add(temp);
}

reset() {
    this.pos.set(width / 2, 300);
    vel.set(0, 0);
}
}



var xpos;

var ypos;

var len;

class Arrow {
  constructor(ball){
    this.xpos = ball.pos.x;
    this.ypos = 10;
    this.len = 20;
}

display() {
    this.xpos = ball.pos.x;
    fill(100);
    triangle(this.xpos, this.ypos, this.xpos + 15, this.ypos + 10, this.xpos - 15, this.ypos + 10);
    rect(this.xpos - 5, this.ypos + 10, 10, 20);
}
}



var brickLayers;

var numBricksA;

var numBricksB;

class Scene {
  constructor() {
    brickLayers = 25;
    numBricksA = 10;
    numBricksB = 9;
}

display() {
    strokeWeight(1);
    stroke(200);
    var brickHeight = height / brickLayers;
    var brickWidth = width / numBricksA;
    for (var i = 1; i <= brickLayers; i++) {
        line(0, brickHeight * i, width, brickHeight * i);
        if (i % 2 == 1) {
            for (var j = 1; j <= numBricksA; j++) {
                line(brickWidth * j, brickHeight * i, brickWidth * j, brickHeight * (i - 1));
            }
        } else {
            for (var j = 1; j <= numBricksA; j++) {
                line(brickWidth * j - (brickWidth / 2), brickHeight * i, brickWidth * j - (brickWidth / 2), brickHeight * (i - 1));
            }
        }
    }
}
}


var ball;

var arrow;

var scene;

var score;

var bestScore;

var gameStage;

function setup() {
    initializeFields();
    let c = createCanvas(600, 700);
    c.parent("game");
    background(255);
    ellipseMode(CENTER);
    frameRate(60);
    ball = new Ball();
    arrow = new Arrow(ball);
    scene = new Scene();
}

function draw() {
    if (gameStage == 0) {
        startMenu();
    } else if (gameStage == 1) {
        gameLoop();
    } else if (gameStage == 2) {
        gameOver();
    }
}

function mousePressed() {
  
    if (gameStage == 0 || gameStage == 2) {
        if (mouseX > ball.pos.x - (ball.radius / 2) && mouseX < ball.pos.x + (ball.radius / 2) && mouseY > ball.pos.y - (ball.radius / 2) && mouseY < ball.pos.y + (ball.radius / 2)) {
            ball.kick(15);
            score = 0;
            gameStage = 1;
        }
    }
    else if (gameStage == 1) {
        if (mouseX > ball.pos.x - (ball.radius / 2) && mouseX < ball.pos.x + (ball.radius / 2) && mouseY > ball.pos.y - (ball.radius / 2) && mouseY < ball.pos.y + (ball.radius / 2)) {
            ball.kick(30);
            score += 1;
        }
    }
}

function startMenu() {
    background(255);
    fill(255, 0, 0);
    scene.display();
    textSize(100);
    text("KickUp", 135, 150);
    ball.display();
    textSize(20);
    text("Click the Ball to Begin", 195, 450);
}

function gameOver() {
    background(255);
    fill(200, 0, 0);
    scene.display();
    textSize(90);
    text("Game Over", 65, 150);
    ball.display();
    textSize(20);
    text("Click the Ball to Play Again", 170, 450);
    text("Score: " + score.toString(), 5, 20);
    text("Best: " + bestScore.toString(), 5, 50);

}

function gameLoop() {
    noStroke();
    background(255);
    fill(0);
    scene.display();
    ball.display();
    ball.fall();
    if (ball.pos.y - ball.radius / 2 > height) {
        if (score > bestScore) {
            bestScore = score;
        }
        gameStage += 1;
        ball.reset();
    }
    if (ball.pos.x - (ball.radius / 2) < 0) {
        ball.bounceWall(0);
    }
    if (ball.pos.x + (ball.radius / 2) > width) {
        ball.bounceWall(1);
    }
    if (ball.pos.y < 0) {
        arrow.display();
    }
    fill(200, 0, 0);
    textSize(20);
    text("Score: " + score.toString(), 5, 20);
    text("Best: " + bestScore.toString(), 5, 50);
}

function initializeFields() {
    radius = 0;
    g = null;
    pos = null;
    vel = null;
    xpos = 0;
    ypos = 0;
    len = 0;
    brickLayers = 0;
    numBricksA = 0;
    numBricksB = 0;
    ball = null;
    arrow = null;
    scene = null;
    score = 0;
    bestScore = 0;
    gameStage = 0;
}
