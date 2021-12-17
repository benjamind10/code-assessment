// Selectors
var timer = document.getElementById('timer');
var mainBtn = document.getElementById('main-btn');
var mainSec = document.getElementById('main-section');
var gameSec = document.getElementById('game-section');

// Questions Object
var questObj = [
  {
    title: 'Commonly used data types DO NOT include ________:',
    options: ['strings', 'alerts', 'booleans', 'numbers'],
    answer: 2,
  },
  {
    title: 'The condition in an if / else statement is enclosed with ________.',
    options: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
    answer: 3,
  },
  {
    title: 'Arrays in JavaScript can be used to store ________.',
    options: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 4,
  },
  {
    title:
      'String values must be enclosed within ________ when being assigned to variables',
    options: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
    answer: 3,
  },
  {
    title:
      'A very useful tool during development and debugging for printing content to the debugger is ________.',
    options: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
    answer: 4,
  },
];

// Global Variables
var timeLeft = 6;
var counter;

// Event listener for main button
mainBtn.addEventListener('click', function () {
  gameStart();
});

function gameStart() {
  mainSec.style.display = 'none';
  gameSec.style.display = 'block';
}

// Function to start the timer
function startTimer() {
  counter = setInterval(function () {
    timeLeft--;
    timer.textContent = 'Time Left: ' + timeLeft;

    if (timeLeft === 0) {
      clearInterval(counter);
    }
  }, 1000);
}
