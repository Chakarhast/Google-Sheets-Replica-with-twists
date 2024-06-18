// Function to expand cell and start snake game
function expandSnake4(event, cell) {
    cell.classList.toggle('expanded');
    if (cell.classList.contains('expanded')) {
        startSnakeGame4(cell.querySelector('.game-container'));
    } else {
        stopSnakeGame4(cell.querySelector('.game-container'));
    }
}

// Function to start the snake game
function startSnakeGame4(container) {
    container.innerHTML = '<canvas id="snake-game" width="250" height="150"></canvas>';
    const canvas = container.querySelector('#snake-game');
    const ctx = canvas.getContext('2d');
    const gameSize = 15;
    const gameData = initializeSnakeGame4(gameSize, canvas.width, canvas.height);

    function gameLoop4() {
        if (!gameData.running) return;
        clearCanvas4(ctx, canvas);
        moveSnake4(gameData);
        drawSnake4(ctx, gameData);
        drawFood4(ctx, gameData);
        drawScore4(ctx, gameData);
        checkCollision4(gameData);
        setTimeout(gameLoop4, 1000 / gameData.speed);
    }

    gameLoop4();
}

// Function to initialize snake game data
function initializeSnakeGame4(size, width, height) {
    const initialSnake = [{ x: size * 2, y: size * 2 }];
    const food = getRandomFoodPosition4(size, width, height, initialSnake);
    const foodImage = loadRandomFoodImage4(); // Load a random food image
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
        snakePartImage: loadSnakePartImage4(), // Load the snake part image
        foodImage: foodImage, // Store the food image
    };
}

// Function to clear the canvas
function clearCanvas4(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to move the snake
function moveSnake4(gameData) {
    const path = dijkstra4(
        new Node4(gameData.snake[0].x, gameData.snake[0].y),
        new Node4(gameData.food.x, gameData.food.y),
        gameData
    );

    if (path.length > 0) {
        const nextMove = path[0];
        gameData.direction = {
            x: nextMove.x - gameData.snake[0].x,
            y: nextMove.y - gameData.snake[0].y,
        };
    } else {
        strategicMove4(gameData);
    }

    const newHead = {
        x: gameData.snake[0].x + gameData.direction.x,
        y: gameData.snake[0].y + gameData.direction.y,
    };

    gameData.snake.unshift(newHead);

    if (newHead.x === gameData.food.x && newHead.y === gameData.food.y) {
        gameData.food = getRandomFoodPosition4(gameData.size, gameData.width, gameData.height, gameData.snake);
    } else {
        gameData.snake.pop();
    }
}

// Function to move the snake strategically when no path is found
function strategicMove4(gameData) {
    const directions = [
        { x: 0, y: -gameData.size },
        { x: 0, y: gameData.size },
        { x: -gameData.size, y: 0 },
        { x: gameData.size, y: 0 },
    ];

    // Find possible moves
    const possibleMoves = directions.filter(direction => {
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

    // Calculate the coverage potential for each move
    const moveScores = possibleMoves.map(move => {
        const futureSnake = [ { x: gameData.snake[0].x + move.x, y: gameData.snake[0].y + move.y } ].concat(gameData.snake.slice(0, -1));
        const coverage = calculateEmptySpaceCoverage4(gameData, futureSnake);
        return { move, coverage };
    });

    // Choose the move with the highest coverage potential
    if (moveScores.length > 0) {
        moveScores.sort((a, b) => b.coverage - a.coverage);
        gameData.direction = moveScores[0].move;
    } else {
        // If no moves are possible, stop the game
        gameData.running = false;
        //alert('Game Over');
    }
}

// Function to calculate the coverage potential for a given snake position
function calculateEmptySpaceCoverage4(gameData, futureSnake) {
    const queue = [ futureSnake[0] ];
    const visited = new Set([ `${futureSnake[0].x},${futureSnake[0].y}` ]);
    let coverage = 0;

    while (queue.length > 0) {
        const { x, y } = queue.shift();
        coverage++;

        const directions = [
            { x: 0, y: -gameData.size },
            { x: 0, y: gameData.size },
            { x: -gameData.size, y: 0 },
            { x: gameData.size, y: 0 },
        ];

        for (const direction of directions) {
            const newX = x + direction.x;
            const newY = y + direction.y;
            const key = `${newX},${newY}`;

            if (
                newX >= 0 &&
                newX < gameData.width &&
                newY >= 0 &&
                newY < gameData.height &&
                !visited.has(key) &&
                !futureSnake.some(segment => segment.x === newX && segment.y === newY)
            ) {
                visited.add(key);
                queue.push({ x: newX, y: newY });
            }
        }
    }

    return coverage;
}

// Function to draw the snake
function drawSnake4(ctx, gameData) {
    const snakePartImage = gameData.snakePartImage;
    gameData.snake.forEach((segment, index) => {
        ctx.drawImage(snakePartImage, segment.x, segment.y, gameData.size, gameData.size);
    });
}

// Function to draw the food
function drawFood4(ctx, gameData) {
    const foodImage = gameData.foodImage;
    ctx.drawImage(foodImage, gameData.food.x, gameData.food.y, gameData.size, gameData.size);
}

// Function to check collision with walls and self
function checkCollision4(gameData) {
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
function stopSnakeGame4(container) {
    container.innerHTML = '';
}

// Helper function to load snake part image
function loadSnakePartImage4() {
    const img = new Image();
    const randomIndex = Math.floor(Math.random() * 5) + 1; // Random index between 1 and 5
    img.src = `SnakeParts/S${randomIndex}.jpg`; // Choose randomly from S1 to S5
    return img;
}

// Helper function to load food images
function loadRandomFoodImage4() {
    const img = new Image();
    const randomIndex = Math.floor(Math.random() * 5) + 1; // Random index between 1 and 5
    img.src = `Food/F${randomIndex}.svg`; // Choose randomly from F1 to F5
    return img;
}

// Helper function to get random food position
function getRandomFoodPosition4(size, width, height, snake) {
    let position;
    do {
        position = {
            x: Math.floor(Math.random() * (width / size)) * size,
            y: Math.floor(Math.random() * (height / size)) * size,
        };
    } while (snake.some(segment => segment.x === position.x && segment.y === position.y));
    return position;
}

// Function to draw the score
function drawScore4(ctx, gameData) {
    ctx.save();
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const score = gameData.snake.length;
    ctx.fillText(score, gameData.width / 2, gameData.height / 2);
    ctx.restore();
}

// Dijkstra's Algorithm Implementation
class Node4 {
    constructor(x, y, distance = Infinity, parent = null) {
        this.x = x;
        this.y = y;
        this.distance = distance;
        this.parent = parent;
    }
}

function dijkstra4(start, end, gameData) {
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

        const neighbors = getNeighbors4(currentNode, gameData, snakeBodySet);

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

function getNeighbors4(node, gameData, snakeBodySet) {
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
            neighbors.push(new Node4(x, y));
        }
    }

    return neighbors;
}
