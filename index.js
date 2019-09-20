'use strict';

const STORE = [
  {id: cuid(), question: 'first', answers:[ 'an', 'ans', 'answer3', 'answer4'], correctAnswer: 'correct answer'},
  {id: cuid(), question: 'second', answers:[ 'answer1', 'answer2', 'answer3', 'answer4'], correctAnswer: 'correct answer'},
  {id: cuid(), question: 'question text', answers:[ 'answer1', 'answer2', 'answer3', 'answer4'], correctAnswer: 'correct answer'},
  {id: cuid(), question: 'question text', answers:[ 'answer1', 'answer2', 'answer3', 'answer4'], correctAnswer: 'correct answer'},
  {id: cuid(), question: 'question text', answers:[ 'answer1', 'answer2', 'answer3', 'answer4'], correctAnswer: 'correct answer'},
  {id: cuid(), questionNumber: 0, score: 0}
];

function questionNumberStepper() {
  let currentNum = STORE[5].questionNumber;
  return currentNum++;
}

function newFunction(item){
  let stepper = questionNumberStepper();
  return `<form class="questions">
  <fieldset> 
    <legend class="questionText">${item.question}</legend> 
  <input type="radio" name="answer 1"> ${item.answers[0]}<br>
  <input type="radio" name="answer 2"> ${item.answers[1]}<br>
  <input type="radio" name="answer 3"> ${item.answers[2]}<br>
  <input type="radio" name="answer 4"> ${item.answers[3]}<br>
  <input type="submit" value="Submit">
</fieldset>
</form>`;
}

function loadQuestion(question){
  $('.startQuiz').html(newFunction(question));
}

function startQuiz() {
    $('.startQuiz').on('click', '.js-button', function(event){
      
      loadQuestion(STORE[questionNumberStepper()]);
    });   
    
}

function createQuestion(item) {
  //template to generate each question
}

function submitAnswer() {
  //listens for when the user "submits" their answer to a question
  //update STORE and render next section
}

function handleAnswer() {
    //check if answer is true or not and display correct or incorrect
}
 
function restartQuiz() {
  //renders original quiz view
  //startQuiz();
}

function doQuiz() {
    startQuiz();
    submitAnswer();
    handleAnswer();
    restartQuiz();
}

$(doQuiz);

