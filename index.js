'use strict';

const STORE = [
  {id: cuid(), question: 'first', answers:[ 'an', 'ans', 'answer3', 'answer4'], correctAnswer: 'answer3'},
  {id: cuid(), question: 'second', answers:[ 'answer1', 'answer2', 'answer3', 'answer4'], correctAnswer: 'answer4'},
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

function correctAnswer() {
  return `<section class="startQuiz">
    <h1>CORRECT!</h1>
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
    let selected = $(":radio").val();
    let correct = STORE[currentQuestion].correctAnswer;
    console.log(selected);
    console.log(STORE[currentQuestion].correctAnswer);
    if (selected === correct) {
      $('.startQuiz').html(correctAnswer());
    }
  });
}

/*$(":radio[name=rate]").change(function() {
  console.log(this.value);
});*/

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
  correctAnswer();
  questionNumberStepper();
}

$(doQuiz);

