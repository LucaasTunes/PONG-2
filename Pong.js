const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 4,
  dx: 4,
  dy: 4
};

const paddleWidth = 10, paddleHeight = 80;

const leftPaddle = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  dy: 10,
  score: 0
};

const rightPaddle = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  dy: 10,
  score: 0
};

function drawBall(x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

function drawPaddle(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

function drawScore(x, y, score, color) {
  context.fillStyle = color;
  context.font = "35px sans-serif";
  context.fillText(score, x, y);
}

function movePaddle(paddle, upKey, downKey) {
  document.addEventListener("keydown", function(event) {
    switch(event.keyCode) {
      case upKey:
        paddle.y -= paddle.dy;
        break;
      case downKey:
        paddle.y += paddle.dy;
        break;
    }
  });
}

function update() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  if (
    ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
    ball.y + ball.radius > leftPaddle.y &&
    ball.y - ball.radius < leftPaddle.y + leftPaddle.height &&
    ball.dx < 0
  ) {
    ball.dx *= -1;
  } else if (
    ball.x + ball.radius > rightPaddle.x &&
    ball.y + ball.radius > rightPaddle.y &&
    ball.y - ball.radius < rightPaddle.y + rightPaddle.height &&
    ball.dx > 0
  ) {
    ball.dx *= -1;
  }

  if (leftPaddle.y < 0) leftPaddle.y = 0;
  else if (leftPaddle.y + leftPaddle.height > canvas.height) leftPaddle.y = canvas.height - leftPaddle.height;

  if (rightPaddle.y < 0) rightPaddle.y = 0;
  else if (rightPaddle.y + rightPaddle.height > canvas.height) rightPaddle.y = canvas.height - rightPaddle.height;

  if (ball.x - ball.radius < 0) {
    rightPaddle.score++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    leftPaddle.score++;
    resetBall();
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx *= -1;
  ball.dy *= Math.random() > 0.5 ? 1 : -1;
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawBall(ball.x, ball.y, ball.radius, "#FFF");

  drawPaddle(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, "#FFF");
  drawPaddle(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, "#FFF");

  drawScore(canvas.width / 4, canvas.height / 6, leftPaddle.score, "#FFF");
  drawScore(3 * canvas.width / 4, canvas.height / 6, rightPaddle.score, "#FFF");
}

function gameLoop() {
  update();
  render();
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawBall(ball.x, ball.y, ball.radius, "#FFF");

  drawPaddle(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, "#FFF");
  drawPaddle(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, "#FFF");

  drawScore(canvas.width / 4, canvas.height / 6, leftPaddle.score, "#FFF");
  drawScore(3 * canvas.width / 4, canvas.height / 6, rightPaddle.score, "#FFF");
}

function startGame() {
  setInterval(gameLoop, 1000 / 60); 
  movePaddle(leftPaddle, 87, 83); 
  movePaddle(rightPaddle, 38, 40); 
}

document.addEventListener("DOMContentLoaded", startGame);
