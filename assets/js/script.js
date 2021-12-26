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
var formEl = document.getElementById('scores-form');
var initialsEl = document.getElementById('initials');
var highScoreEl = document.getElementById('highscores-initials');
var clearScoresEl = document.getElementById('clear-scores');
var userEl = document.getElementById('user');
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Questions Object
var questObj = [
  {
    title: 'Commonly used data types DO NOT include ________:',
    options: ['strings', 'alerts', 'booleans', 'numbers'],
    answer: 1,
  },
  {
    title:
      'The condition in an if / else statement is enclosed with ________.',
    options: [
      'quotes',
      'curly brackets',
      'parenthesis',
      'square brackets',
    ],
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
    options: [
      'JavaScript',
      'terminal/bash',
      'for loops',
      'console.log',
    ],
    answer: 3,
  },
];

// Global Variables
var counter;
var timeLeft = 76;
var cIndex = 0;
var lIndex = questObj.length;

// Event listener for main button
mainBtnEl.addEventListener('click', gameStart);

// Event listener for high scores
scoreBtnEl.addEventListener('click', function () {
  mainSecEl.style.display = 'none';
  highSecEl.style.display = 'block';
  showHighScore();
});

// Event listener for form
formEl.addEventListener('submit', formHandler);

// Event listener for reset quiz button
resetBtnEl.addEventListener('click', resetGame);

// Clear scores on click
clearScoresEl.addEventListener('click', clearScores);

function clearScores() {
  // Sets the session storage highscores to a blank array
  highScores = [];
  highScoreEl.textContent = '';
  highScoreEl.style.display = 'none';
  window.localStorage.clear(); // Clears the local storage
  timeLeft = 76; //Resets the timer
}

// Starts the game and calls new functions
function gameStart() {
  mainSecEl.style.display = 'none';
  answersEl.style.display = 'block';
  makeQuestions();
  startTimer();
}

// This function helps print the high score sorted from highest to lowest.
function showHighScore() {
  clearInterval(counter);
  timerEl.textContent = 'Time Left: ' + 0;
  userEl.textContent = '';
  highScores.sort((a, b) => {
    return b.score - a.score;
  });
  // This loop will print the high scores
  for (var i = 0; i < highScores.length; i++) {
    var user = document.createElement('li');
    user.textContent =
      'Initials: ' +
      highScores[i].name +
      ' Score: ' +
      highScores[i].score;
    userEl.appendChild(user);
  }
  highScoreEl.appendChild(userEl);
}

// Function to end the game and display your current high score.
function gameOver() {
  gameSecEl.style.display = 'none';
  highSecEl.style.display = 'none';
  gameOverEl.style.display = 'block';

  gameOverEl.appendChild(answersEl);

  clearInterval(counter);
  timerEl.style.display = 'none';

  // Conditional to check if the timer is below 0 to only display 0
  if (timeLeft < 0) {
    finalScoreEl.textContent = '0';
  } else {
    finalScoreEl.textContent = timeLeft;
  }
}

// This handler will help the form submission
function formHandler(e) {
  e.preventDefault();
  gameOverEl.style.display = 'none';
  answersEl.style.display = 'none';
  highSecEl.style.display = 'block';

  if (initialsEl.value === '' || initialsEl.value.length > 3) {
    alert('Initials must be between 1-3 chars.');
    gameOver();
    return false;
  } else {
    var cUser = initialsEl.value.trim();
    var cHighScore = { name: cUser, score: timeLeft };

    if (cHighScore.name === '') {
      return false;
    } else {
      highScores.push(cHighScore);
      localStorage.setItem('highScores', JSON.stringify(highScores));
      showHighScore();
      highScoreEl.style.display = 'block';
    }
  }
}

// Function to reset the game
function resetGame() {
  highSecEl.style.display = 'none';
  mainSecEl.style.display = 'block';
  cIndex = 0;
  timeLeft = 76;
  timerEl.style.display = 'block';
  timerEl.textContent = 'Time Left: ' + 0;
}

// Generates question function loops through the object every time a new question generates
function makeQuestions(index = 0) {
  gameSecEl.style.display = 'block';
  var activeQ = questObj[index];

  if (cIndex === lIndex) return gameOver();

  questionsEl.textContent = activeQ.title;
  makeButtons(activeQ.options);
}

// This function loops through the object array for the anwers and makes the answers buttons
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

// This a helper function that creates the event listeners for the buttons
function createEventListener(btn) {
  if (btn) {
    btn.addEventListener('click', function () {
      validateListener(btn);
    });
  } else {
    return 0;
  }
}

// This helper fucntion clears the class name of the needed element.
function clearEl(className) {
  var elements = document.getElementsByClassName(className);

  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

// Function that will validate the answers being selected by the user and keep track of the score.
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
