var mainButton = document.getElementById('main-button');
var mTitle = document.getElementById('mTitle');
var mBody = document.getElementById('body');
var form = document.querySelector('form');
var mChoices = document.querySelector('input');

var mainObj = [
  {
    title: 'Coding Quiz Challenge',
    body: 'Try to answer the following code questions within the allowed time. Incorrect answers will be penalized with 10 seconds off the clock/score.',
  },
  {
    title: 'Commonly used data types DO NOT include:',
    options: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed with?',
    options: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
  },
];

mTitle.textContent = mainObj[0].title;
mBody.textContent = mainObj[0].body;

mainButton.addEventListener('click', function () {
  mTitle.textContent = mainObj[1].title;
  mainButton.style.display = 'none';
  makeButton(mainObj[1].options);
});

form.addEventListener('click', function (e) {
  console.log(e);
});

function makeButton(choices) {
  mBody.textContent = '';

  for (var i = 0; i < choices.length; i++) {
    var btnChoice = document.createElement('input');
    btnChoice.className = 'ui button';
    btnChoice.type = 'button';
    btnChoice.value = choices[i];
    form.appendChild(btnChoice);
  }
}
