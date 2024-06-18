// Function to expand cell and start snake game
function expandSnake1(event, cell) {
    cell.classList.toggle('expanded');
    if (cell.classList.contains('expanded')) {
        startSnakeGame1(cell.querySelector('.game-container'));
    } else {
        stopSnakeGame1(cell.querySelector('.game-container'));
    }
}

// Function to start the snake game
function startSnakeGame1(container) {
    container.innerHTML = '<canvas id="snake-game" width="250" height="150"></canvas>';
    const canvas = container.querySelector('#snake-game');
    const ctx = canvas.getContext('2d');
    const gameSize = 15;
    const gameData = initializeSnakeGame1(gameSize, canvas.width, canvas.height);

    // Event listener for keyboard controls
    document.addEventListener('keydown', (event) => {
        handleKeyPress1(event, gameData);
    });

    function gameLoop1() {
        if (!gameData.running) return;
        clearCanvas1(ctx, canvas);
        moveSnake1(gameData);
        drawSnake1(ctx, gameData);
        drawScore1(ctx, gameData); // Draw the score
        drawFood1(ctx, gameData);
        checkCollision1(gameData);
        setTimeout(gameLoop1, 1000 / gameData.speed);
    }

    gameLoop1();
}

// Function to initialize snake game data
function initializeSnakeGame1(size, width, height) {
    const initialSnake = [{ x: size * 2, y: size * 2 }];
    const food = getRandomFoodPosition1(size, width, height, initialSnake);
    const snakePartImage = loadSnakePartImage(); // Load the snake part image
    const foodImage = loadRandomFoodImage(); // Load a random food image
    return {
        snake: initialSnake,
        direction: { x: size, y: 0 },
        nextDirection: { x: size, y: 0 },
        food,
        size,
        width,
        height,
        speed: 10,
        running: true,
        snakePartImage: snakePartImage, // Use the same snake part image for the entire game
        foodImage: foodImage, // Store the food image
    };
}

// Function to draw the score
function drawScore1(ctx, gameData) {
    ctx.save();
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgba(0,0,0, 1)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const score = gameData.snake.length;
    ctx.fillText(score, gameData.width / 2, gameData.height / 2);
    ctx.restore();
}

// Helper function to load a random food image
function loadRandomFoodImage() {
    const img = new Image();
    const randomIndex = Math.floor(Math.random() * 5) + 1; // Random index between 1 and 5
    img.src = `Food/F${randomIndex}.svg`; // Choose randomly from F1 to F5
    return img;
}

// Function to draw the food
function drawFood1(ctx, gameData) {
    const foodImage = gameData.foodImage;
    ctx.drawImage(foodImage, gameData.food.x, gameData.food.y, gameData.size, gameData.size);
}

// Function to stop the snake game
function stopSnakeGame1(container) {
    container.innerHTML = '';
}

// Function to handle key press events for controlling the snake
function handleKeyPress1(event, gameData) {
    const keyMap = {
        ArrowUp: { x: 0, y: -gameData.size },
        ArrowDown: { x: 0, y: gameData.size },
        ArrowLeft: { x: -gameData.size, y: 0 },
        ArrowRight: { x: gameData.size, y: 0 }
    };

    if (keyMap[event.key]) {
        event.preventDefault(); // Prevent default behavior like scrolling
        const newDirection = keyMap[event.key];

        // Prevent the snake from reversing into itself
        if (
            newDirection.x !== -gameData.direction.x &&
            newDirection.y !== -gameData.direction.y
        ) {
            gameData.nextDirection = newDirection;
        }
    }
}

// Function to move the snake
function moveSnake1(gameData) {
    gameData.direction = gameData.nextDirection;

    const newHead = {
        x: gameData.snake[0].x + gameData.direction.x,
        y: gameData.snake[0].y + gameData.direction.y,
    };

    gameData.snake.unshift(newHead);

    if (newHead.x === gameData.food.x && newHead.y === gameData.food.y) {
        gameData.food = getRandomFoodPosition1(gameData.size, gameData.width, gameData.height, gameData.snake);
    } else {
        gameData.snake.pop();
    }
}

// Function to draw the snake
function drawSnake1(ctx, gameData) {
    gameData.snake.forEach((segment, index) => {
        const image = gameData.snakePartImage;
        ctx.drawImage(image, segment.x, segment.y, gameData.size, gameData.size);
    });
}

// Function to clear the canvas
function clearCanvas1(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to check collision with walls and self
function checkCollision1(gameData) {
    const head = gameData.snake[0];
    if (
        head.x < 0 || head.x >= gameData.width ||
        head.y < 0 || head.y >= gameData.height ||
        gameData.snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameData.running = false;
        //alert('Game Over');
    }
}

// Helper function to load snake part image
function loadSnakePartImage() {
    const img = new Image();
    const randomIndex = Math.floor(Math.random() * 5) + 1; // Random index between 1 and 5
    img.src = `SnakeParts/S${randomIndex}.jpg`; // Choose randomly from S1 to S5
    return img;
}

// Helper function to get random food position
function getRandomFoodPosition1(size, width, height, snake) {
    let position;
    do {
        position = {
            x: Math.floor(Math.random() * (width / size)) * size,
            y: Math.floor(Math.random() * (height / size)) * size,
        };
    } while (snake.some(segment => segment.x === position.x && segment.y === position.y));
    return position;
}
