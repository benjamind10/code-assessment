var startPage = document.getElementById('start-page');
var mainBtn = document.getElementById('btn-start');
var questionEl = document.getElementById('questions');
var buttonsEl = document.getElementById('buttons');
var gamePage = document.getElementById('game-page');
var resultsPage = document.getElementById('results-page');
var gameOverPage = document.getElementById('gameover-page');
var btnA = document.getElementById('a');
var btnB = document.getElementById('b');
var btnC = document.getElementById('c');
var btnD = document.getElementById('d');

var mainObj = [
  {
    title: 'Commonly used data types DO NOT include ________:',
    options: ['strings', 'alerts', 'booleans', 'numbers'],
    answer: 'b',
  },
  {
    title: 'The condition in an if / else statement is enclosed with ________.',
    options: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
    answer: 'c',
  },
  {
    title: 'Arrays in JavaScript can be used to store ________.',
    options: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'd',
  },
  {
    title:
      'String values must be enclosed within ________ when being assigned to variables',
    options: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
    answer: 'c',
  },
  {
    title:
      'A very useful tool during development and debugging for printing content to the debugger is ________.',
    options: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
    answer: 'd',
  },
];

var currentIndex = 0;
var lastIndex = mainObj.length;
var score = 0;

mainBtn.addEventListener('click', function () {
  gameStart();
});

function gameStart() {
  startPage.style.display = 'none';
  gameOverPage.style.display = 'none';
  makeQuestions();
}

function makeQuestions() {
  gamePage.style.display = 'block';
  var activeQ = mainObj[currentIndex];

  if (currentIndex === lastIndex) {
    return gameOver();
  }
  questionEl.innerHTML = '<h2>' + activeQ.title + '</h2>';
  btnA.innerHTML = activeQ.options[0];
  btnB.innerHTML = activeQ.options[1];
  btnC.innerHTML = activeQ.options[2];
  btnD.innerHTML = activeQ.options[3];
}

function validate(choice) {
  var final = mainObj[currentIndex].answer;
  var isChecked = document.createElement('p');
  resultsPage.textContent = '';

  isChecked.className = 'results-text';

  if (choice === final && currentIndex != lastIndex) {
    score++;
    currentIndex++;
    isChecked.textContent = 'Correct!';
    resultsPage.appendChild(isChecked);
    makeQuestions();
  } else if (choice != final && currentIndex != lastIndex) {
    isChecked.textContent = 'Wrong!';
    resultsPage.appendChild(isChecked);
    currentIndex++;
    makeQuestions();
  } else {
    gameOver();
  }
}

function gameOver() {
  gamePage.style.display = 'none';
  resultsPage.style.display = 'none';
  gameOverPage.style.display = 'block';

  var finalScore = document.createElement('h4');
  finalScore.innerHTML = 'Your final score: ' + score;
  gameOverPage.appendChild(finalScore);
}
