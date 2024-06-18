// When the snake in current loop iteration sees that its bounded by its body and boundary, it tries to randomly move in empty space in order to 
// delay time so there comes a loop iteration where a path opens up

// I will try where i try take longest path so game time is longer but snake will try something else and not get into complex situation taking shortest

// i will also try that whenever snake finds itself bounded, it calculates best possible way to fill up empty sapce area
// as it delays most time and snake must fill it up in a way such that head can find an exit so we must see the place where opening will appear
// It will be like a graph and we have to find a path to go from s to t while covering most nodes in  between

/// Function to expand cell and start snake game
function expandSnake(event, cell) {
    cell.classList.toggle('expanded');
    if (cell.classList.contains('expanded')) {
        startSnakeGame(cell.querySelector('.game-container'));
    } else {
        stopSnakeGame(cell.querySelector('.game-container'));
    }
}

// Function to start the snake game
function startSnakeGame(container) {
    container.innerHTML = '<canvas id="snake-game" width="250" height="150"></canvas>';
    const canvas = container.querySelector('#snake-game');
    const ctx = canvas.getContext('2d');
    const gameSize = 15;
    const gameData = initializeSnakeGame(gameSize, canvas.width, canvas.height);

    function gameLoop() {
        if (!gameData.running) return;
        clearCanvas(ctx, canvas);
        moveSnake(gameData);
        drawSnake(ctx, gameData);
        drawFood(ctx, gameData);
        drawScore(ctx, gameData); // Draw the score
        checkCollision(gameData);
        setTimeout(gameLoop, 1000 / gameData.speed);
    }

    gameLoop();
}

// Function to initialize snake game data
function initializeSnakeGame(size, width, height) {
    const initialSnake = [{ x: size * 2, y: size * 2 }];
    const food = getRandomFoodPosition(size, width, height, initialSnake);
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
        snakePartImage: loadSnakePartImage(), // Load the snake part image
        foodImage: foodImage, // Store the food image
    };
}

// Function to clear the canvas
function clearCanvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to move the snake
function moveSnake(gameData) {
    const path = dijkstra(
        new Node(gameData.snake[0].x, gameData.snake[0].y),
        new Node(gameData.food.x, gameData.food.y),
        gameData
    );

    if (path.length > 0) {
        const nextMove = path[0];
        gameData.direction = {
            x: nextMove.x - gameData.snake[0].x,
            y: nextMove.y - gameData.snake[0].y,
        };
    } else {
        moveRandomly(gameData);
    }

    const newHead = {
        x: gameData.snake[0].x + gameData.direction.x,
        y: gameData.snake[0].y + gameData.direction.y,
    };

    gameData.snake.unshift(newHead);

    if (newHead.x === gameData.food.x && newHead.y === gameData.food.y) {
        gameData.food = getRandomFoodPosition(gameData.size, gameData.width, gameData.height, gameData.snake);
    } else {
        gameData.snake.pop();
    }
}

// Function to move the snake randomly when no path is found
function moveRandomly(gameData) {
    const directions = [
        { x: 0, y: -gameData.size },
        { x: 0, y: gameData.size },
        { x: -gameData.size, y: 0 },
        { x: gameData.size, y: 0 },
    ];
    const possibleDirections = directions.filter(direction => {
        const newX = gameData.snake[0].x + direction.x;
        const newY = gameData.snake[0].y + direction.y;
        return (
            newX >= 0 &&
            newX < gameData.width &&
            newY >= 0 &&
            newY < gameData.height &&
            !gameData.snake.some(segment => segment.x === newX && segment.y === newY)
        );
    });

    if (possibleDirections.length > 0) {
        const randomDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
        gameData.direction = randomDirection;
    }
}

// Function to draw the snake
function drawSnake(ctx, gameData) {
    const snakePartImage = gameData.snakePartImage;
    gameData.snake.forEach((segment, index) => {
        ctx.drawImage(snakePartImage, segment.x, segment.y, gameData.size, gameData.size);
    });
}

// Function to draw the food
function drawFood(ctx, gameData) {
    const foodImage = gameData.foodImage;
    ctx.drawImage(foodImage, gameData.food.x, gameData.food.y, gameData.size, gameData.size);
}

// Function to draw the score
function drawScore(ctx, gameData) {
    ctx.save();
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgba(0,0,0, 1)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const score = gameData.snake.length;
    ctx.fillText(score, gameData.width / 2, gameData.height / 2);
    ctx.restore();
}

// Function to check collision with walls and self
function checkCollision(gameData) {
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

// Function to stop the snake game
function stopSnakeGame(container) {
    container.innerHTML = '';
}

// Helper function to load snake part image
function loadSnakePartImage() {
    const img = new Image();
    const randomIndex = Math.floor(Math.random() * 5) + 1; // Random index between 1 and 5
    img.src = `SnakeParts/S${randomIndex}.jpg`; // Choose randomly from S1 to S5
    return img;
}

// Helper function to load food images
function loadRandomFoodImage() {
    const img = new Image();
    const randomIndex = Math.floor(Math.random() * 5) + 1; // Random index between 1 and 5
    img.src = `Food/F${randomIndex}.svg`; // Choose randomly from F1 to F5
    return img;
}

// Helper function to get random food position
function getRandomFoodPosition(size, width, height, snake) {
    let position;
    do {
        position = {
            x: Math.floor(Math.random() * (width / size)) * size,
            y: Math.floor(Math.random() * (height / size)) * size,
        };
    } while (snake.some(segment => segment.x === position.x && segment.y === position.y));
    return position;
}

// Dijkstra's Algorithm Implementation
class Node {
    constructor(x, y, distance = Infinity, parent = null) {
        this.x = x;
        this.y = y;
        this.distance = distance;
        this.parent = parent;
    }
}

function dijkstra(start, end, gameData) {
    const openList = [];
    const closedList = new Set();
    const snakeBodySet = new Set(gameData.snake.map(segment => `${segment.x},${segment.y}`));
    start.distance = 0;
    openList.push(start);

    while (openList.length > 0) {
        openList.sort((a, b) => a.distance - b.distance);
        const currentNode = openList.shift();
        closedList.add(`${currentNode.x},${currentNode.y}`);

        if (currentNode.x === end.x && currentNode.y === end.y) {
            const path = [];
            let temp = currentNode;
            while (temp.parent) {
                path.push(temp);
                temp = temp.parent;
            }
            return path.reverse();
        }

        const neighbors = getNeighbors(currentNode, gameData, snakeBodySet);

        for (const neighbor of neighbors) {
            if (closedList.has(`${neighbor.x},${neighbor.y}`)) continue;

            const tentativeDistance = currentNode.distance + 1;

            const existingNode = openList.find(n => n.x === neighbor.x && n.y === neighbor.y);
            if (existingNode) {
                if (tentativeDistance < existingNode.distance) {
                    existingNode.distance = tentativeDistance;
                    existingNode.parent = currentNode;
                }
            } else {
                neighbor.distance = tentativeDistance;
                neighbor.parent = currentNode;
                openList.push(neighbor);
            }
        }
    }

    return [];
}

function getNeighbors(node, gameData, snakeBodySet) {
    const neighbors = [];
    const directions = [
        { x: 0, y: -gameData.size },
        { x: 0, y: gameData.size },
        { x: -gameData.size, y: 0 },
        { x: gameData.size, y: 0 },
    ];

    for (const direction of directions) {
        const x = node.x + direction.x;
        const y = node.y + direction.y;

        if (x >= 0 && x < gameData.width && y >= 0 && y < gameData.height && !snakeBodySet.has(`${x},${y}`)) {
            neighbors.push(new Node(x, y));
        }
    }

    return neighbors;
}
