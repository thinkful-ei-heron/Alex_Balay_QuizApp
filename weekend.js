'use strict';

const STORE = [
  {id: cuid(), question: 'first', answers:[ 'an', 'ans', 'right', 'answer4'], correctAnswer: 'right'},
  {id: cuid(), question: 'second', answers:[ 'answer1', 'right', 'answer3', 'answer4'], correctAnswer: 'answer4'},
  {id: cuid(), question: 'third', answers:[ 'answer1', 'no', 'right', 'answer4'], correctAnswer: 'right'},
  {id: cuid(), question: 'fourth', answers:[ 'right', 'answer2', 'answer3', 'answer4'], correctAnswer: 'right'},
  {id: cuid(), question: 'fifth', answers:[ 'answer1', 'answer2', 'answer3', 'right'], correctAnswer: 'right'},
  {id: cuid(), questionNumber: 0, score: 0}
];

function questionTemplate(item){
  console.log(item);
  return `<form class="questions">
  <fieldset class="questionList"> 
    <legend class="questionText">${item.question}</legend> 
  <input type="radio" name = answers value=${item.answers[0]}> ${item.answers[0]}<br>
  <input type="radio" name = answers value=${item.answers[1]}> ${item.answers[1]}<br>
  <input type="radio" name = answers value=${item.answers[2]}> ${item.answers[2]}<br>
  <input type="radio" name = answers value=${item.answers[3]}> ${item.answers[3]}<br>
  <input type="submit" value="Submit" class="answer-button">
</fieldset>
</form>`;
}

function loadQuestion(question){
  $('.startQuiz').html(questionTemplate(question));
}

function startQuiz() {
  $('.startQuiz').on('click', '.js-button', function(event){
    loadQuestion(STORE[STORE[5].questionNumber]);
  });   
    
}



function numDisplay(questionNum) {
   $('.questionNum').text(`${questionNum}`);
}

function correctAnswer() {
  STORE[5].score = STORE[5].score + 1;
  STORE[5].questionNumber = STORE[5].questionNumber + 1;
  $('.scoreNum').text(`${STORE[5].score}`);
  numDisplay(STORE[5].questionNumber);
  return `<section class="startQuiz">
    <h1>CORRECT!</h1>
    <img>
    <button type="button" class="startButton js-button">Next Question</button>
    </section>`;
}

function wrongAnswer() {
  STORE[5].questionNumber = STORE[5].questionNumber + 1;
  numDisplay(STORE[5].questionNumber);
  return `<section class="startQuiz">
    <h1>Nice going, Jerry. You got it wrong.</h1>
    <img>
    <button type="button" class="startButton js-button">Next Question</button>
    </section>`;
}

function submitAnswer() {
  console.log("THIS WORKS");
  //listens for when the user "submits" their answer to a question
  //update STORE and render next section
  $('.startQuiz').submit(function(event) {
    event.preventDefault();
    console.log("CLICK");
    console.log(STORE[5].questionNumber);
    let currentQuestion = STORE[5].questionNumber;
    let selected = $("input[name='answers']:checked").val();
    let correct = STORE[currentQuestion].correctAnswer;
    console.log(currentQuestion);
    console.log(selected);
    console.log(STORE[currentQuestion].correctAnswer);
    if (selected === correct) {
      $('.startQuiz').html(correctAnswer());
    }
    else {
      $('.startQuiz').html(wrongAnswer());
    }
  });
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
  //correctAnswer();
  //questionNumberStepper();
}

$(doQuiz);

