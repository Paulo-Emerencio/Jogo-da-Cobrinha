// Background
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
// A cobrinha
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box,
}
// Direção inicial da cobrinha
let direction = "right";

function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function startGame() {
    createBG();
    createSnake();
    // Coordenadas da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;
    // Removendo a posição anterior do Array quando a cobrinha anda
    snake.pop();
    // Adicionando uma nova posição no Array para fazer a cobrinha andar
    let newHead = {
        x: snakeX,
        y: snakeY,
    }
    snake.unshift(newHead);
}
let game = setInterval(startGame, 100);

