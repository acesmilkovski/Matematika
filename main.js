const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let gameStarted = false; // Track if the game has started

function startGame() {
    document.addEventListener('keydown', changeDirection);
    canvas.addEventListener('mousemove', startGameWithMouse); // Add mousemove event listener
    setInterval(() => {
        if (gameStarted) updateGame(); // Only update the game if it has started
    }, 100);
}

function startGameWithMouse(event) {
    if (!gameStarted) {
        changeDirectionWithMouse(event); // Set initial direction based on mouse
        gameStarted = true; // Mark the game as started
    }
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

function changeDirectionWithMouse(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const head = snake[0];
    const headX = head.x * 10 + 5; // Center of the snake's head
    const headY = head.y * 10 + 5;

    const deltaX = mouseX - headX;
    const deltaY = mouseY - headY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal movement
        if (deltaX > 0 && direction.x === 0) direction = { x: 1, y: 0 };
        else if (deltaX < 0 && direction.x === 0) direction = { x: -1, y: 0 };
    } else {
        // Vertical movement
        if (deltaY > 0 && direction.y === 0) direction = { x: 0, y: 1 };
        else if (deltaY < 0 && direction.y === 0) direction = { x: 0, y: -1 };
    }
}

function updateGame() {
    moveSnake();
    if (checkCollision()) {
        alert('Game Over! Your score: ' + score);
        document.location.reload();
    }
    drawGame();
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * canvas.width / 10);
    food.y = Math.floor(Math.random() * canvas.height / 10);
}

function checkCollision() {
    const head = snake[0];
    return head.x < 0 || head.x >= canvas.width / 10 || head.y < 0 || head.y >= canvas.height / 10 || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10));
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}

startGame();