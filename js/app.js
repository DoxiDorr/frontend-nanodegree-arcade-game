/*
Sets an initial player score of 0. The game is won when
the player reaches a score of 5
*/

var score = 0;
document.getElementById("playerScore").innerHTML = score;


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }
    // collision handler - checks if player collides with an enemy
    // if that is the case then position is set to beginning
    if (this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
      player.x = 200;
      player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = "images/char-boy.png";
}

Player.prototype.update = function () {
  if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching top of canvas and winning the game
    // if top is reached then 1 is added to score and position of player
    // is set to the beginning
    // winTheGame is a function which checks if a score of five is reached
    // if yes then game is won

    if (this.y < 0) {
        score++;
        document.getElementById("playerScore").innerHTML = score;
        this.x = 200;
        this.y = 380;
        winTheGame();
    }
}

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// function that takes the pressed button as input
// moves the character around the canvas

Player.prototype.handleInput = function (keyPress) {
    if (keyPress == "left") {
      this.x -= this.speed + 50;
    }
    if (keyPress == "right") {
      this.x += this.speed + 50;
    }
    if (keyPress == "up") {
      this.y -= this.speed + 30;
    }
    if (keyPress == "down") {
      this.y += this.speed + 30;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemyPosition = [60, 140, 220, 300];
var player = new Player (200, 380, 50);


enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// alert to show player that he has won
// resets score to null

winTheGame = function () {
  if (score == 5) {
    alert("You won! Press ok to play again.");
    score = 0;
    document.getElementById("playerScore").innerHTML = score;
  }
}
