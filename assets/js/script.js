var startPage = document.getElementById('start-page');
var mainBtn = document.getElementById('btn-start');
var questionEl = document.getElementById('questions');
var buttonsEl = document.getElementById('buttons');
var quizPage = document.getElementById('quiz-page');

var mainObj = [
  {
    title: 'Commonly used data types DO NOT include ________:',
    options: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed with ________.',
    options: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
    answer: 'parenthesis',
  },
  {
    title: 'Arrays in JavaScript can be used to store ________.',
    options: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    title:
      'String values must be enclosed within ________ when being assigned to variables',
    options: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
    answer: 'quotes',
  },
  {
    title:
      'A very useful tool during development and debugging for printing content to the debugger is ________.',
    options: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];

var currentIndex = 0;
var lastIndex = mainObj.length;

mainBtn.addEventListener('click', function () {
  debugger;
  gameStart();
});

function gameStart() {
  startPage.style.display = 'none';
  genQuestions();
}

function genQuestions() {
  quizPage.style.display = 'flex';
  questionEl.innerHTML = '<p>' + mainObj[currentIndex].title + '<p>';
  quizPage.appendChild(questionEl);
  makeButtons();
}

function makeButtons() {
  var choices = mainObj[currentIndex].options;
  for (var i = 0; i < choices.length; i++) {
    var btnChoice = document.createElement('button');
    btnChoice.className = 'ui button';
    btnChoice.type = 'button';
    btnChoice.value = choices[i];
    buttonsEl.appendChild(btnChoice);
  }
}
