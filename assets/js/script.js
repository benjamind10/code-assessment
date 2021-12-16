var mainButton = document.getElementById('main-button');
var mTitle = document.getElementById('mTitle');
var mBody = document.getElementById('body');

var mainObj = [
  {
    title: 'Coding Quiz Challenge',
    body: 'Try to answer the following code questions within the allowed time. Incorrect answers will be penalized with 10 seconds off the clock/score.',
  },
  {
    title: 'Commonly used data types DO NOT include:',
    options: ['strings', 'booleans', 'alerts', 'options'],
    answer: 'alerts',
  },
];

mTitle.textContent = mainObj[0].title;
mBody.textContent = mainObj[0].body;

mainButton.addEventListener('click', function () {
  mTitle.textContent = mainObj[1].title;
});

function makeButton() {
  var choices1 = mainObj[1].options;
  for (var i = 0; i < choices1.length; i++) {
    console.log(choices1[i]);
  }
}
