// Selectors
var timerEl = document.getElementById('timer');
var mainBtnEl = document.getElementById('main-btn');
var mainSecEl = document.getElementById('main-section');
var gameSecEl = document.getElementById('game-section');
var highSecEl = document.getElementById('highscores-section');
var scoreBtnEl = document.getElementById('high-scores');
var resetBtnEl = document.getElementById('reset-btn');
var questionsEl = document.getElementById('questions');
var buttonsEl = document.getElementById('buttons');
var answersEl = document.getElementById('answers-section');
var checkedEl = document.getElementById('checked');

// Questions Object
var questObj = [
  {
    title: 'Commonly used data types DO NOT include ________:',
    options: ['strings', 'alerts', 'booleans', 'numbers'],
    answer: 1,
  },
  {
    title: 'The condition in an if / else statement is enclosed with ________.',
    options: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
    answer: 2,
  },
  {
    title: 'Arrays in JavaScript can be used to store ________.',
    options: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 3,
  },
  {
    title:
      'String values must be enclosed within ________ when being assigned to variables',
    options: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
    answer: 2,
  },
  {
    title:
      'A very useful tool during development and debugging for printing content to the debugger is ________.',
    options: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
    answer: 3,
  },
];

// Global Variables
var timeLeft = 76;
var counter;
var cIndex = 0;
var lIndex = questObj.length;
var score = 0;

// Event listener for main button
mainBtnEl.addEventListener('click', function () {
  gameStart();
});

// Event listener for high scores
scoreBtnEl.addEventListener('click', function () {
  highScore();
});

// Event listener for reset quiz button
resetBtnEl.addEventListener('click', function () {
  highSecEl.style.display = 'none';
  mainSecEl.style.display = 'block';
});

function gameStart() {
  mainSecEl.style.display = 'none';
  makeQuestions();
  startTimer();
}

function makeQuestions(index = 0) {
  gameSecEl.style.display = 'block';
  var activeQ = questObj[index];

  if (cIndex === lIndex) return gameOver();

  questionsEl.textContent = activeQ.title;
  makeButtons(activeQ.options);
}

function makeButtons(question) {
  for (var i = 0; i < question.length; i++) {
    var btn = document.createElement('button');
    btn.setAttribute('id', i);
    btn.className = 'choices';
    btn.textContent = question[i];
    buttonsEl.appendChild(btn);
    createEventListener(btn);
  }
}

function createEventListener(node) {
  if (node) {
    node.addEventListener('click', function () {
      validateListener(node);
    });
  } else {
    console('not working');
  }
}

function clearButtons() {
  var elements = document.getElementsByClassName('choices');

  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function validateListener(choices) {
  var choice = parseInt(choices.id);
  var answer = questObj[cIndex].answer;
  var isChecked = document.createElement('p');
  checkedEl.textContent = '';

  if (choice === answer && cIndex != lIndex) {
    score++;
    cIndex++;
    isChecked.textContent = 'Correct!';
    answersEl.appendChild(isChecked);
    clearButtons();
    makeQuestions(cIndex);
  }
}

function highScore() {
  gameSecEl.style.display = 'none';
  mainSecEl.style.display = 'none';
  highSecEl.style.display = 'block';
}

function gameOver() {
  mainSecEl.style.display = 'none';
  gameSecEl.style;
}

// Function to start the timer
function startTimer() {
  counter = setInterval(function () {
    timeLeft--;
    timerEl.textContent = 'Time Left: ' + timeLeft;

    if (timeLeft === 0) {
      clearInterval(counter);
      // highScore();
    }
  }, 1000);
}
