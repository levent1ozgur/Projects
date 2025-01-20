// Setup canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load the asteroid image
const asteroidImage = new Image();
asteroidImage.src =
  "https://raw.githubusercontent.com/levent1ozgur/Space-Maneuvering-Game/refs/heads/main/pixelarts/astreoid.png";

// Load the spaceship image
const spaceshipImage = new Image();
spaceshipImage.src =
  "https://raw.githubusercontent.com/levent1ozgur/Space-Maneuvering-Game/refs/heads/main/pixelarts/Ship_1.png";

// Game settings
const ship = {
  x: canvas.width / 2,
  y: canvas.height - 100,
  size: 50, // Size for the spaceship image
  speed: 5
};

const asteroids = [];
const asteroidCount = 50;
const asteroidSize = 32;
const asteroidSpeed = 2;

let gameStarted = false;
let gameOver = false;
let countdown = 3;
let timer = 0;
let timerInterval;

// Initialize asteroids
function initAsteroids() {
  asteroids.length = 0;
  for (let i = 0; i < asteroidCount; i++) {
    asteroids.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height
    });
  }
}

// Handle keyboard input
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

document.addEventListener("keydown", (e) => {
  if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
});

// Update game state
function update() {
  if (!gameStarted || gameOver) return;

  // Move the ship
  if (keys.ArrowUp) ship.y -= ship.speed;
  if (keys.ArrowDown) ship.y += ship.speed;
  if (keys.ArrowLeft) ship.x -= ship.speed;
  if (keys.ArrowRight) ship.x += ship.speed;

  // Keep ship within bounds
  if (ship.x < 0) ship.x = 0;
  if (ship.x > canvas.width) ship.x = canvas.width;
  if (ship.y < 0) ship.y = 0;
  if (ship.y > canvas.height) ship.y = canvas.height;

  // Move asteroids
  asteroids.forEach((asteroid) => {
    asteroid.y += asteroidSpeed;

    // Reset asteroid to the top when it goes off-screen
    if (asteroid.y > canvas.height) {
      asteroid.y = -asteroidSize;
      asteroid.x = Math.random() * canvas.width;
    }

    // Check for collisions
    const dist = Math.hypot(ship.x - asteroid.x, ship.y - asteroid.y);
    if (dist < ship.size / 2) {
      gameOver = true;
      clearInterval(timerInterval);
      showTryAgainButton();
    }
  });
}

// Draw game elements
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameStarted) {
    drawMainMenu();
    return;
  }

  if (gameOver) {
    drawGameOverScreen();
    return;
  }

  // Draw timer
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.textAlign = "left";
  ctx.fillText(`Time: ${timer} seconds`, 10, 40);

  // Draw asteroids
  asteroids.forEach((asteroid) => {
    ctx.drawImage(
      asteroidImage,
      asteroid.x - asteroidSize / 2,
      asteroid.y - asteroidSize / 2,
      asteroidSize,
      asteroidSize
    );
  });

  // Draw spaceship
  ctx.drawImage(
    spaceshipImage,
    ship.x - ship.size / 2,
    ship.y - ship.size / 2,
    ship.size,
    ship.size
  );
}

// Draw main menu
function drawMainMenu() {
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    "Space Maneuvering Game",
    canvas.width / 2,
    canvas.height / 2 - 50
  );
  ctx.font = "30px Arial";
  ctx.fillText('Click "Start" to Begin', canvas.width / 2, canvas.height / 2);
}

// Countdown before game starts
function startCountdown() {
  const interval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "100px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      countdown > 0 ? countdown : "GO!",
      canvas.width / 2,
      canvas.height / 2
    );
    countdown--;

    if (countdown < -1) {
      clearInterval(interval);
      gameStarted = true;
      initAsteroids();
      timer = 0;
      timerInterval = setInterval(() => timer++, 1000);
      gameLoop();
    }
  }, 1000);
}

// Show "Try Again" button and time message
function showTryAgainButton() {
  const message = document.createElement("div");
  message.innerText = `Your time was ${timer} seconds.`;
  message.style.position = "absolute";
  message.style.left = `${canvas.width / 2 - 150}px`;
  message.style.top = `${canvas.height / 2 - 50}px`;
  message.style.color = "white";
  message.style.fontSize = "20px";
  document.body.appendChild(message);

  const button = document.createElement("button");
  button.innerText = "Try Again";
  button.style.position = "absolute";
  button.style.left = `${canvas.width / 2 - 50}px`;
  button.style.top = `${canvas.height / 2}px`;
  button.style.padding = "10px 20px";
  button.style.fontSize = "20px";
  document.body.appendChild(button);

  button.onclick = () => {
    button.remove();
    message.remove();
    gameOver = false;
    countdown = 3;
    ship.x = canvas.width / 2;
    ship.y = canvas.height - 100;
    initAsteroids();
    startCountdown();
  };
}

// Main game loop
function gameLoop() {
  update();
  draw();
  if (!gameOver) requestAnimationFrame(gameLoop);
}

// Start button
const startButton = document.createElement("button");
startButton.innerText = "Start";
startButton.style.position = "absolute";
startButton.style.left = `${canvas.width / 2 - 50}px`;
startButton.style.top = `${canvas.height / 2 + 50}px`;
startButton.style.padding = "10px 20px";
startButton.style.fontSize = "20px";
document.body.appendChild(startButton);

startButton.onclick = () => {
  startButton.remove();
  startCountdown();
};
