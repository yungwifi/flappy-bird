// let bird = document.getElementById("bird");
// console.log(bird);
// bird.style.position = "absolute";
// bird.style.left = 20 + "px";
// bird.style.top = 400 + "px";

// const game = {
//   gravity: () => {
//     for (let i = 400; i < 550; i++) {
//       setTimeout(() => {
//         bird.style.top = i + "px";
//         console.log(bird.style.top);
//       }, 100);
//     }
//   },

//   jump: () => {
//     for (let i = bird.style.top; i > 500; i--) {
//         bird.style.top = i + "px "
//     }
//     console.log(bird.style.top);
//     // bird.style.top
//   }
// };

// game.gravity();
// document.body.onkeyup = function(e) {
//   if (e.keyCode == 32) {
//     game.jump();
//   }
// };

function startGame() {
  myGamePiece = new Bird(30, 30, "red", 80, 75);
  myGameArea.start();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  stop: function () {
    clearInterval(this.interval);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

function Bird(width, height, color, x, y, type) {
  this.type = type;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.gravity = 0.05;
  this.gravitySpeed = 0;
  this.update = function () {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPos = function () {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
    this.hitTop();
  };
  this.hitBottom = function () {
    var rockBottom = myGameArea.canvas.height - this.height;
    if (this.y > rockBottom) {
      this.y = rockBottom;
    }
  }
  this.hitTop = function () {
    var rockTop = myGameArea.canvas.height
    if (this.y < 0) {
      this.y = 0;
    }
  }
}

function Pipe(width, height, color, x, y) {
  this.width = width
  this.height = height
  this.color = color
  this.x = x
  this.y = y
  this.speedX = 0
  this.speedY = 0
}

function accelerate(n) {
  myGamePiece.gravity = n;
}

function moveRight(n) {
  myGamePiece.x = n
}
function updateGameArea() {
  myGameArea.clear();
  myGamePiece.newPos();
  myGamePiece.update();
}

function gameEnd(){
  myGameArea.clear();
  myGamePiece.newPos();
  myGamePiece.update();
}

document.body.onkeypress = function (e) {
  if (e.keyCode == 32) {
    accelerate(-0.5);
    let i = 100
    moveRight(300)
  }
};

document.body.onkeyup = function (e) {
  console.log("up");
  if (e.keyCode == 32) {
    accelerate(0.5);
  }
};

startGame();
