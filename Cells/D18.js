
  // D18: Function to expand cell and start bouncing ball game
  function expandBounce(cell) {
    cell.classList.toggle('expanded');
    if (cell.classList.contains('expanded')) {
      startBouncingBall(cell.querySelector('.game-container'));
    } else {
      stopBouncingBall(cell.querySelector('.game-container'));
    }
  }
  
  // Function to start the bouncing ball game
  function startBouncingBall(container) {
    container.innerHTML = '';
    const ball = createBall();
    container.appendChild(ball);
    const containerRect = container.getBoundingClientRect();
    const gameData = initializeGame(containerRect, ball);
    spawnBricks(container, gameData.currentBrickCount);
    updatePosition(gameData, container);
  }
  
  // Function to create a ball element
  function createBall() {
    const ballNumber = Math.floor(Math.random() * 8) + 1; // Generate a random number between 1 and 8
    const ball = document.createElement('img');
    ball.classList.add('ball');
    ball.src = `Balls/B${ballNumber}.svg`; // Path to randomly chosen ball image
    return ball;
  }
  
  // Function to initialize game data
  function initializeGame(containerRect, ball) {
    return {
      positionX: 0,
      positionY: 0,
      velocityX: 2,
      velocityY: 2,
      containerRect,
      ball,
      initialBrickCount: 5,
      currentBrickCount: 5
    };
  }
  
  // Function to spawn bricks
  function spawnBricks(container, count) {
    for (let i = 0; i < count; i++) {
      const brick = createBrick(container);
      container.appendChild(brick);
    }
  }
  
  // Function to create a brick element
  function createBrick(container) {
    const brick = document.createElement('div');
    brick.classList.add('brick');
    const containerRect = container.getBoundingClientRect();
    brick.style.left = `${Math.random() * (containerRect.width - 30)}px`;
    brick.style.top = `${Math.random() * (containerRect.height / 2)}px`;
    brick.style.backgroundColor = getRandomPastelColor();
    return brick;
  }
  
  // Function to generate a random pastel color
  function getRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360); // Random hue
    const saturation = 50 + Math.random() * 30; // Low saturation for pastel colors (50-80%)
    const lightness = 70 + Math.random() * 20; // High lightness for pastel colors (70-90%)
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  
  // Function to update ball position
  function updatePosition(gameData, container) {
    gameData.positionX += gameData.velocityX;
    gameData.positionY += gameData.velocityY;
  
    // Check for collision with the boundaries and reverse direction if needed
    if (gameData.positionX <= 0 || gameData.positionX + gameData.ball.offsetWidth >= gameData.containerRect.width) {
      gameData.velocityX = -gameData.velocityX;
    }
    if (gameData.positionY <= 0 || gameData.positionY + gameData.ball.offsetHeight >= gameData.containerRect.height) {
      gameData.velocityY = -gameData.velocityY;
    }
  
    gameData.ball.style.left = `${gameData.positionX}px`;
    gameData.ball.style.top = `${gameData.positionY}px`;
  
    // Check for collision with bricks
    const bricks = container.querySelectorAll('.brick');
    bricks.forEach(brick => {
      const brickRect = brick.getBoundingClientRect();
      const ballRect = gameData.ball.getBoundingClientRect();
      if (
        ballRect.left < brickRect.right &&
        ballRect.right > brickRect.left &&
        ballRect.top < brickRect.bottom &&
        ballRect.bottom > brickRect.top
      ) {
        brick.remove();
        gameData.velocityY = -gameData.velocityY;
        gameData.currentBrickCount--;
      }
    });
  
    // Check if all bricks are hit
    if (gameData.currentBrickCount === 0) {
      gameData.initialBrickCount++;
      gameData.currentBrickCount = gameData.initialBrickCount;
      spawnBricks(container, gameData.currentBrickCount);
    }
  
    requestAnimationFrame(() => updatePosition(gameData, container));
  }
  
  // Function to stop the bouncing ball game
  function stopBouncingBall(container) {
    container.innerHTML = '';
  }
  


  