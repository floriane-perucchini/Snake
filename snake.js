// DRAW BOARD

const blockSize = 20;
const rows = 25;
const cols = 25;

const board = document.getElementById("board");
const context = board.getContext("2d");

let color = "red";

// SNAKE

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

const snakeBody = [];

let velocityX = 0;
let velocityY = 0;

let count = 0;

function changeDirection(event) {
    if (event.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (event.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (event.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (event.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


// FOOD
let foodX = 0;
let foodY = 0;

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

let gameOver = false;


window.onload = function() {
    board.height = rows * blockSize;
    board.width = cols * blockSize;

    color = randomHexColor()
    placeFood();
    document.addEventListener("keyup", changeDirection);
    update();
    setInterval(update, 1000/10); //100 milliseconds
};


function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle= color;
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        count ++;
        color = randomHexColor();
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert(`Perdu ! Vous avez marque ${count} points`);
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert(`Perdu ! Vous avez marque ${count} points`);
        }
    }
}


// RANDOM FOOD COLOR 
function randomHexColor() {
  return `#${Math.random().toString(16).slice(2, 8)}`;
}