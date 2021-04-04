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
// A comida da cobrinha
let food = {
    x: Math.floor(Math.random() * 15 + Math.random()) * box,
    y: Math.floor(Math.random() * 15 + Math.random()) * box,
}
// Funções que desenham os elementos do jogo
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
function createFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}
// Event Listener das teclas do teclado
document.addEventListener('keydown', newDirection);
function newDirection(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}
// Função que executa o jogo
function startGame() {
    // Resetando a posição da cobrinha quando ela passa as bordas
    if (snake[0].x > 15 * box) snake[0].x = 0;
    if (snake[0].x < 0) snake[0].x = 16 * box;
    if (snake[0].y > 15 * box) snake[0].y = 0;
    if (snake[0].y < 0) snake[0].y = 16 * box;
    // Checando se a cobrinha se chocou com ela mesma
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over');
            document.location.reload();
        }
    }
    // Executando as funções que desenham os elementos do jogo
    createBG();
    createSnake();
    createFood();
    // Coordenadas da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;
    // Condições que determinam se a cobrinha pegou ou não a comida
    if (snakeX != food.x || snakeY != food.y) {
        // Se a comida aparecer na posição 0 de X ou Y, a cobrinha poderá pegá-la saindo pelo lado oposto do Canvas e resetando sua posição onde está a comida
        if (food.x == 0 && snake[0].x == 0 && snake[0].y == food.y) {
            food.x = Math.floor(Math.random() * 15 + Math.random()) * box;
            food.y = Math.floor(Math.random() * 15 + Math.random()) * box;
        } else if (food.y == 0 && snake[0].y == 0 && snake[0].x == food.x) {
            food.x = Math.floor(Math.random() * 15 + Math.random()) * box;
            food.y = Math.floor(Math.random() * 15 + Math.random()) * box;
        } else {
            // Remove a última posição do Array
            snake.pop();
        }
    } else {
        food.x = Math.floor(Math.random() * 15 + Math.random()) * box;
        food.y = Math.floor(Math.random() * 15 + Math.random()) * box;
    }
    // Adicionar uma nova posição no começo do Array
    let newPosition = {
        x: snakeX,
        y: snakeY,
    }
    snake.unshift(newPosition);
}
let game = setInterval(startGame, 100);