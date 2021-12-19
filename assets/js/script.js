// Selectors
var timerEl = document.getElementById('timer');
var mainBtnEl = document.getElementById('main-btn');
var finalScoreEl = document.getElementById('final-score');
var gameOverEl = document.getElementById('gameover-section');
var mainSecEl = document.getElementById('main-section');
var gameSecEl = document.getElementById('game-section');
var highSecEl = document.getElementById('highscores-section');
var scoreBtnEl = document.getElementById('high-scores');
var resetBtnEl = document.getElementById('reset-btn');
var questionsEl = document.getElementById('questions');
var buttonsEl = document.getElementById('buttons');
var answersEl = document.getElementById('answers-section');
var checkedEl = document.getElementById('checked');
var formEl = document.getElementById('scores-form');
var initialsEl = document.getElementById('initials');
var highScoreEl = document.getElementById('highscores-initials');

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

// High Scores Object
var highScores = {};

// Global Variables
var counter;
var timeLeft = 76;
var cIndex = 0;
var lIndex = questObj.length;
var user = '';

// Event listener for main button
mainBtnEl.addEventListener('click', gameStart);

// Event listener for high scores
scoreBtnEl.addEventListener('click', function () {
  mainSecEl.style.display = 'none';
  gameSecEl.style.display = 'none';
  gameOverEl.style.display = 'none';
  highSecEl.style.display = 'block';
});

// Event listener for form
formEl.addEventListener('submit', formHandler);

// Event listener for reset quiz button
resetBtnEl.addEventListener('click', resetGame);

function gameStart() {
  mainSecEl.style.display = 'none';
  answersEl.style.display = 'block';
  makeQuestions();
  startTimer();
}

function updateScore() {
  var user = document.createElement('p');
  highScoreEl.style.display = 'block';
  user.innerHTML =
    '<h4>' + 'Initials: ' + highScores.initials + ' Score: ' + highScores.score;
  highScoreEl.appendChild(user);
}

function gameOver() {
  mainSecEl.style.display = 'none';
  gameSecEl.style.display = 'none';
  highSecEl.style.display = 'none';
  gameOverEl.style.display = 'block';

  gameOverEl.appendChild(answersEl);

  clearInterval(counter);
  timerEl.style.display = 'none';

  if (timeLeft < 0) {
    finalScoreEl.textContent = '0';
  } else {
    finalScoreEl.textContent = timeLeft;
  }
}

function formHandler(e) {
  e.preventDefault();
  var val = document.querySelector('input').value;

  highScores.initials = val;
  highScores.score = timeLeft;
  updateScore();
  gameOverEl.style.display = 'none';
  answersEl.style.display = 'none';
  highSecEl.style.display = 'block';
}

function resetGame() {
  highSecEl.style.display = 'none';
  mainSecEl.style.display = 'block';
  cIndex = 0;
  timeLeft = 76;
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

function createEventListener(btn) {
  if (btn) {
    btn.addEventListener('click', function () {
      validateListener(btn);
    });
  } else {
    return 0;
  }
}

function clearEl(className) {
  var elements = document.getElementsByClassName(className);

  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function validateListener(choices) {
  var choice = parseInt(choices.id);
  var answer = questObj[cIndex].answer;
  var isChecked = document.createElement('p');
  isChecked.className = 'checked';
  answersEl.textContent = '';

  if (choice === answer && cIndex != lIndex) {
    cIndex++;
    isChecked.textContent = 'Correct!';
    answersEl.appendChild(isChecked);
    clearEl('choices');
    makeQuestions(cIndex);
  } else if (choice != answer && cIndex != lIndex) {
    timeLeft -= 10;
    cIndex++;
    isChecked.style.color = 'red';
    isChecked.textContent = 'Wrong!';
    answersEl.appendChild(isChecked);
    clearEl('choices');
    makeQuestions(cIndex);
  } else {
    gameOver();
  }
}

// Function to start the timer
function startTimer() {
  counter = setInterval(function () {
    timeLeft--;
    timerEl.textContent = 'Time Left: ' + timeLeft;

    if (timeLeft === 0) {
      clearInterval(counter);
      gameOver();
    }
  }, 1000);
}
