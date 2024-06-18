// // Function to expand cell and start snake game
// function expandSnake(event, cell) {
//     cell.classList.toggle('expanded');
//     if (cell.classList.contains('expanded')) {
//         startSnakeGame(cell.querySelector('.game-container'));
//     } else {
//         stopSnakeGame(cell.querySelector('.game-container'));
//     }
// }

// // Function to start the snake game
// function startSnakeGame(container) {
//     container.innerHTML = '<canvas id="snake-game" width="250" height="150"></canvas>';
//     const canvas = container.querySelector('#snake-game');
//     const ctx = canvas.getContext('2d');
//     const gameSize = 15;
//     const gameData = initializeSnakeGame(gameSize, canvas.width, canvas.height);

//     function gameLoop() {
//         if (!gameData.running) return;
//         clearCanvas(ctx, canvas);
//         moveSnake(gameData);
//         drawSnake(ctx, gameData);
//         drawFood(ctx, gameData);
//         checkCollision(gameData);
//         setTimeout(gameLoop, 1000 / gameData.speed);
//     }

//     gameLoop();
// }

// // Function to initialize snake game data
// function initializeSnakeGame(size, width, height) {
//     const initialSnake = [{ x: size * 2, y: size * 2 }];
//     const food = getRandomFoodPosition(size, width, height, initialSnake);
//     const foodImage = loadRandomFoodImage(); // Load a random food image
//     return {
//         snake: initialSnake,
//         direction: { x: size, y: 0 },
//         nextDirection: { x: size, y: 0 },
//         food,
//         size,
//         width,
//         height,
//         speed: 10,
//         running: true,
//         snakePartImage: loadSnakePartImage(), // Load the snake part image
//         foodImage: foodImage, // Store the food image
//         score: 0, // Track the score
//     };
// }

// // Function to clear the canvas
// function clearCanvas(ctx, canvas) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// // Function to move the snake
// function moveSnake(gameData) {
//     const path = dijkstra(
//         new Node(gameData.snake[0].x, gameData.snake[0].y),
//         new Node(gameData.food.x, gameData.food.y),
//         gameData
//     );

//     if (path.length > 0) {
//         const nextMove = path[0];
//         gameData.direction = {
//             x: nextMove.x - gameData.snake[0].x,
//             y: nextMove.y - gameData.snake[0].y,
//         };
//     } else {
//         moveRandomly(gameData);
//     }

//     const newHead = {
//         x: gameData.snake[0].x + gameData.direction.x,
//         y: gameData.snake[0].y + gameData.direction.y,
//     };

//     gameData.snake.unshift(newHead);

//     if (newHead.x === gameData.food.x && newHead.y === gameData.food.y) {
//         gameData.food = getRandomFoodPosition(gameData.size, gameData.width, gameData.height, gameData.snake);
//         gameData.score++;
//     } else {
//         gameData.snake.pop();
//     }
// }

// // Function to move the snake randomly when no path is found
// function moveRandomly(gameData) {
//     const directions = [
//         { x: 0, y: -gameData.size },
//         { x: 0, y: gameData.size },
//         { x: -gameData.size, y: 0 },
//         { x: gameData.size, y: 0 },
//     ];
//     const possibleDirections = directions.filter(direction => {
//         const newX = gameData.snake[0].x + direction.x;
//         const newY = gameData.snake[0].y + direction.y;
//         return (
//             newX >= 0 &&
//             newX < gameData.width &&
//             newY >= 0 &&
//             newY < gameData.height &&
//             !gameData.snake.some(segment => segment.x === newX && segment.y === newY)
//         );
//     });

//     if (possibleDirections.length > 0) {
//         const randomDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
//         gameData.direction = randomDirection;
//     }
// }

// // Function to draw the snake
// function drawSnake(ctx, gameData) {
//     const snakePartImage = gameData.snakePartImage;
//     gameData.snake.forEach((segment, index) => {
//         ctx.drawImage(snakePartImage, segment.x, segment.y, gameData.size, gameData.size);
//     });
// }

// // Function to draw the food
// function drawFood(ctx, gameData) {
//     const foodImage = gameData.foodImage;
//     ctx.drawImage(foodImage, gameData.food.x, gameData.food.y, gameData.size, gameData.size);
// }

// // Function to check collision with walls and self
// function checkCollision(gameData) {
//     const head = gameData.snake[0];
//     if (
//         head.x < 0 || head.x >= gameData.width ||
//         head.y < 0 || head.y >= gameData.height ||
//         gameData.snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
//     ) {
//         gameData.running = false;
//     }
// }

// // Function to stop the snake game
// function stopSnakeGame(container) {
//     container.innerHTML = '';
// }

// // Helper function to load snake part image
// function loadSnakePartImage() {
//     const img = new Image();
//     const randomIndex = Math.floor(Math.random() * 5) + 1; // Random index between 1 and 5
//     img.src = `SnakeParts/S${randomIndex}.jpg`; // Choose randomly from S1 to S5
//     return img;
// }

// // Helper function to load food images
// function loadRandomFoodImage() {
//     const img = new Image();
//     const randomIndex = Math.floor(Math.random() * 5) + 1; // Random index between 1 and 5
//     img.src = `Food/F${randomIndex}.svg`; // Choose randomly from F1 to F5
//     return img;
// }

// // Helper function to get random food position
// function getRandomFoodPosition(size, width, height, snake) {
//     let position;
//     do {
//         position = {
//             x: Math.floor(Math.random() * (width / size)) * size,
//             y: Math.floor(Math.random() * (height / size)) * size,
//         };
//     } while (snake.some(segment => segment.x === position.x && segment.y === position.y));
//     return position;
// }

// // Dijkstra's Algorithm Implementation
// class Node {
//     constructor(x, y, distance = Infinity, parent = null) {
//         this.x = x;
//         this.y = y;
//         this.distance = distance;
//         this.parent = parent;
//     }
// }

// function dijkstra(start, end, gameData) {
//     const openList = [];
//     const closedList = new Set();
//     const snakeBodySet = new Set(gameData.snake.map(segment => `${segment.x},${segment.y}`));
//     start.distance = 0;
//     openList.push(start);

//     while (openList.length > 0) {
//         openList.sort((a, b) => a.distance - b.distance);
//         const currentNode = openList.shift();
//         closedList.add(`${currentNode.x},${currentNode.y}`);

//         if (currentNode.x === end.x && currentNode.y === end.y) {
//             const path = [];
//             let temp = currentNode;
//             while (temp.parent) {
//                 path.push(temp);
//                 temp = temp.parent;
//             }
//             return path.reverse();
//         }

//         const neighbors = getNeighbors(currentNode, gameData, snakeBodySet);

//         for (const neighbor of neighbors) {
//             if (closedList.has(`${neighbor.x},${neighbor.y}`)) continue;

//             const tentativeDistance = currentNode.distance + 1;

//             const existingNode = openList.find(n => n.x === neighbor.x && n.y === neighbor.y);
//             if (existingNode) {
//                 if (tentativeDistance < existingNode.distance) {
//                     existingNode.distance = tentativeDistance;
//                     existingNode.parent = currentNode;
//                 }
//             } else {
//                 neighbor.distance = tentativeDistance;
//                 neighbor.parent = currentNode;
//                 openList.push(neighbor);
//             }
//         }
//     }

//     return [];
// }

// function getNeighbors(node, gameData, snakeBodySet) {
//     const neighbors = [];
//     const directions = [
//         { x: 0, y: -gameData.size },
//         { x: 0, y: gameData.size },
//         { x: -gameData.size, y: 0 },
//         { x: gameData.size, y: 0 },
//     ];

//     for (const direction of directions) {
//         const x = node.x + direction.x;
//         const y = node.y + direction.y;

//         if (x >= 0 && x < gameData.width && y >= 0 && y < gameData.height && !snakeBodySet.has(`${x},${y}`)) {
//             neighbors.push(new Node(x, y));
//         }
//     }

//     return neighbors;
// }

// // Function for the first snake algorithm (doesn't avoid its own body)
// function moveSnakeAlgorithm1(gameData) {
//     // Add logic here for the snake that doesn't avoid its own body
//     const path = dijkstra3(
//         new Node3(gameData.snake[0].x, gameData.snake[0].y),
//         new Node3(gameData.food.x, gameData.food.y),
//         gameData
//     );

//     if (path.length > 0) {
//         const nextMove = path[0];
//         gameData.direction = {
//             x: nextMove.x - gameData.snake[0].x,
//             y: nextMove.y - gameData.snake[0].y,
//         };
//     }

//     const newHead = {
//         x: gameData.snake[0].x + gameData.direction.x,
//         y: gameData.snake[0].y + gameData.direction.y,
//     };

//     // Check if the new head collides with the snake's body
//     if (gameData.snake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
//         gameData.running = false;
//        // alert('Game Over');
//         return;
//     }

//     gameData.snake.unshift(newHead);

//     if (newHead.x === gameData.food.x && newHead.y === gameData.food.y) {
//         gameData.food = getRandomFoodPosition3(gameData.size, gameData.width, gameData.height, gameData.snake);
//     } else {
//         gameData.snake.pop();
//     }
// }

// // Function for the second snake algorithm (avoids its own body)
// function moveSnakeAlgorithm2(gameData) {
//     // Add logic here for the snake that avoids its own body
//     const path = dijkstra2(
//         new Node2(gameData.snake[0].x, gameData.snake[0].y),
//         new Node2(gameData.food.x, gameData.food.y),
//         gameData
//     );

//     if (path.length > 0) {
//         const nextMove = path[0];
//         gameData.direction = {
//             x: nextMove.x - gameData.snake[0].x,
//             y: nextMove.y - gameData.snake[0].y,
//         };
//     }

//     const newHead = {
//         x: gameData.snake[0].x + gameData.direction.x,
//         y: gameData.snake[0].y + gameData.direction.y,
//     };

//     gameData.snake.unshift(newHead);

//     if (newHead.x === gameData.food.x && newHead.y === gameData.food.y) {
//         gameData.food = getRandomFoodPosition2(gameData.size, gameData.width, gameData.height, gameData.snake);
//     } else {
//         gameData.snake.pop();
//     }
// }

// // Function for the third snake algorithm (moves randomly when no path)
// function moveSnakeAlgorithm3(gameData) {
//     // Add logic here for the snake that moves randomly in free space when no path
//     const path = dijkstra(
//         new Node(gameData.snake[0].x, gameData.snake[0].y),
//         new Node(gameData.food.x, gameData.food.y),
//         gameData
//     );

//     if (path.length > 0) {
//         const nextMove = path[0];
//         gameData.direction = {
//             x: nextMove.x - gameData.snake[0].x,
//             y: nextMove.y - gameData.snake[0].y,
//         };
//     } else {
//         moveRandomly(gameData);
//     }

//     const newHead = {
//         x: gameData.snake[0].x + gameData.direction.x,
//         y: gameData.snake[0].y + gameData.direction.y,
//     };

//     gameData.snake.unshift(newHead);

//     if (newHead.x === gameData.food.x && newHead.y === gameData.food.y) {
//         gameData.food = getRandomFoodPosition(gameData.size, gameData.width, gameData.height, gameData.snake);
//     } else {
//         gameData.snake.pop();
//     }

// }

// // Function for the fourth snake algorithm (strategic move when no path)
// function moveSnakeAlgorithm4(gameData) {
//     // Add logic here for the snake that makes a strategic move when no path
//     const path = dijkstra4(
//         new Node4(gameData.snake[0].x, gameData.snake[0].y),
//         new Node4(gameData.food.x, gameData.food.y),
//         gameData
//     );

//     if (path.length > 0) {
//         const nextMove = path[0];
//         gameData.direction = {
//             x: nextMove.x - gameData.snake[0].x,
//             y: nextMove.y - gameData.snake[0].y,
//         };
//     } else {
//         strategicMove4(gameData);
//     }

//     const newHead = {
//         x: gameData.snake[0].x + gameData.direction.x,
//         y: gameData.snake[0].y + gameData.direction.y,
//     };

//     gameData.snake.unshift(newHead);

//     if (newHead.x === gameData.food.x && newHead.y === gameData.food.y) {
//         gameData.food = getRandomFoodPosition4(gameData.size, gameData.width, gameData.height, gameData.snake);
//     } else {
//         gameData.snake.pop();
//     }
// }

// // Function to run the game simulation and get the score
// function runGameSimulation(algorithm, iterations) {
//     let totalScore = 0;
//     for (let i = 0; i < iterations; i++) {
//         const gameData = initializeSnakeGame(15, 250, 150);
//         while (gameData.running) {
//             clearCanvas(document.createElement('canvas').getContext('2d'), { width: 250, height: 150 });
//             algorithm(gameData);
//             checkCollision(gameData);
//         }
//         totalScore += gameData.score;
//     }
//     return totalScore / iterations;
// }

// // Function to run simulations for all algorithms and display results in specific cells
// function runSimulationsAndDisplayResults() {
//     const iterations = 1;
//     const averageScore1 = runGameSimulation(moveSnakeAlgorithm1, iterations);
//     const averageScore2 = runGameSimulation(moveSnakeAlgorithm2, iterations);
//     const averageScore3 = runGameSimulation(moveSnakeAlgorithm3, iterations);
//     const averageScore4 = runGameSimulation(moveSnakeAlgorithm4, iterations);

//     document.getElementById('B4').innerText = averageScore1;
//     document.getElementById('C4').innerText = averageScore2;
//     document.getElementById('D4').innerText = averageScore3;
//     document.getElementById('E4').innerText = averageScore4;
// }