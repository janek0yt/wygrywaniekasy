const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = 400;

let snake = [
  { x: 160, y: 160 },
  { x: 140, y: 160 },
  { x: 120, y: 160 }
];

let dx = gridSize;
let dy = 0;

let food = { x: 200, y: 200 };
let score = 0; // liczba zjedzonych jabłek (1 jabłko = 0.01 "zł")

// Funkcja pomocnicza – zamienia wynik na zapis pieniężny z dwoma miejscami po przecinku
function money() {
  return (score / 100).toFixed(2);
}


let gameInterval = setInterval(updateGame, 100);

document.addEventListener('keydown', e => {
  if (e.key === 'W') up();
  else if (e.key === 'S') down();
  else if (e.key === 'A') l();
  else if (e.key === 'D') r();
});

function updateGame() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // kolizja ze ścianą lub samym sobą → koniec gry
  if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || collisionWithSnake(head)) {
    clearInterval(gameInterval);
    if ( Math.floor(Math.random() * 2) === 0) {
        alert("Zapłać: " + money() + "zł!")
    } else {
        alert("Wygrałeś: " + money() + "zł!")
    }

    window.location.reload();
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1; // poprawka: dodajemy 1, a nie nadpisujemy
    generateFood();
  } else {
    snake.pop();
  }

  drawGame();
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'green';
  snake.forEach(part => ctx.fillRect(part.x, part.y, gridSize, gridSize));

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);

  ctx.fillStyle = 'black';
  ctx.font = '16px Arial';
  
  ctx.fillText("Pieniądze: " + money(), 10, 20); // zawsze dwa miejsca po przecinku
}

function generateFood() {
  food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

function collisionWithSnake(head) {
  return snake.some(part => part.x === head.x && part.y === head.y);
}

// Sterowanie
function up() {
  if (dy === 0) {
    dx = 0;
    dy = -gridSize;
  }
}

function down() {
  if (dy === 0) {
    dx = 0;
    dy = gridSize;
  }
}

function l() {
  if (dx === 0) {
    dx = -gridSize;
    dy = 0;
  }
}

function r() {
  if (dx === 0) {
    dx = gridSize;
    dy = 0;
  }
}
