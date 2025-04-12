// JavaScript for RGB Color Guessing Game

// Selecting elements
const rgbDisplay = document.getElementById("rgbDisplay");
const container = document.getElementById("container");
const message = document.getElementById("message");
const livesCount = document.getElementById("livesCount");
const scoreDisplay = document.getElementById("score");
const newColorsBtn = document.getElementById("newColors");
const restartBtn = document.getElementById("restartBtn");
const easyBtn = document.getElementById("easyBtn");
const hardBtn = document.getElementById("hardBtn");

let numSquares = 6;
let colors = [];
let pickedColor;
let lives = 3;
let score = 0;

// Utility function to generate a random color
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Generate an array of random colors
function generateRandomColors(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

// Pick one random color from array
function pickColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Reset the game board
function resetGame() {
  lives = 3;
  score = 0;
  livesCount.textContent = lives;
  scoreDisplay.textContent = score;
  restartBtn.style.display = "none";
  newColors();
}

// Start or refresh the color tiles
function newColors() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  rgbDisplay.textContent = pickedColor.toUpperCase();
  container.innerHTML = "";

  colors.forEach(color => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.backgroundColor = color;
    container.appendChild(square);

    square.addEventListener("click", () => {
      if (color === pickedColor) {
        message.textContent = "Correct!";
        score++;
        scoreDisplay.textContent = score;
        newColors();
      } else {
        message.textContent = "Wrong! Try again.";
        lives--;
        livesCount.textContent = lives;
        square.style.backgroundColor = "#2c2c2c";
        if (lives === 0) {
          message.textContent = "Game Over!";
          restartBtn.style.display = "inline-block";
          container.innerHTML = "";
        }
      }
    });
  });
}

// Event Listeners
newColorsBtn.addEventListener("click", newColors);
restartBtn.addEventListener("click", resetGame);
easyBtn.addEventListener("click", () => {
  easyBtn.classList.add("selected");
  hardBtn.classList.remove("selected");
  numSquares = 3;
  newColors();
});
hardBtn.addEventListener("click", () => {
  hardBtn.classList.add("selected");
  easyBtn.classList.remove("selected");
  numSquares = 6;
  newColors();
});

// Initialize the game
newColors();
