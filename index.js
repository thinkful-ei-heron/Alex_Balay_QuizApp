'use strict';

function startQuiz() {
    //when a user clicks on the start quiz button
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
}

function doQuiz() {
    startQuiz();
    submitAnswer();
    handleAnswer();
    restartQuiz();
}

$(doQuiz);

