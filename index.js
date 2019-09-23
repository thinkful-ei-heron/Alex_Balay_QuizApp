'use strict';

const STORE = {
  questions: [
    {id: cuid(), questionNum: 1, question: 'What does Rick use to travel between dimensions and universes?', answers:[ 'space laser', 'portal gun', 'tardis', 'universe key'], correctAnswer: 'portal gun'},
    {id: cuid(), questionNum: 2, question: 'second', answers:[ 'answer1', 'answer2', 'answer3', 'answer4'], correctAnswer: 'answer4'},
    {id: cuid(), questionNum: 3, question: 'third', answers:[ 'answer1', 'answer2', 'answer3', 'answer4'], correctAnswer: 'answer2'},
    {id: cuid(), questionNum: 4, question: 'fourth', answers:[ 'answer1', 'answer2', 'answer3', 'answer4'], correctAnswer: 'answer2'},
    {id: cuid(), questionNum: 5, question: 'fifth', answers:[ 'answer1', 'answer2', 'answer3', 'answer4'], correctAnswer: 'answer4'}
  ],
  questionNumber: 0,
  score: 0
};



function generateQuestion(question, questionNum, currentScore) {
  if (questionNum < 5) {
    let nextQuestion = STORE.questions[questionNum];
    let newHeader = `<ul>
      <li class="questionCount">Question
          <span class="questionNum">${nextQuestion.questionNum}</span>/5</li>
      <li class ="scoreCount">Score:
          <span class="scoreNum">${currentScore}</span></li>  
  </ul>`;
    let questionText = 
    `<form class="submitAnswer">
    <fieldset id="${nextQuestion.id}">
            <legend class="questionText">${nextQuestion.question}</legend>
            <input type="radio" name="answer" id="answer1" value="${nextQuestion.answers[0]}" required>
            <label for="answer1">${nextQuestion.answers[0]}</label>
            <br>
            <input type="radio" name="answer" id="answer2" value="${nextQuestion.answers[1]}">
            <label for="answer2">${nextQuestion.answers[1]}</label>
            <br>
            <input type="radio" name="answer" id="answer3" value="${nextQuestion.answers[2]}">
            <label for="answer3">${nextQuestion.answers[2]}</label>
            <br>
            <input type="radio" name="answer" id="answer4" value="${nextQuestion.answers[3]}">
            <label for="answer4">${nextQuestion.answers[3]}</label>
    </fieldset>
    <button type="submit" class="submitAnswer">Submit</button>
  </form>`;
      
    $('.score').html(newHeader);
    $('.container').html(questionText);
    

  } else {
    $('.logoScore').empty();
    $('.container').html(`<h3>FINALPAGE</h3>
    <img src="" alt="" class="image">
      <h3>Your score is ${currentScore}/5</h3>
      <p class="comment">lololol</p>
      <button type="button" class="restartButton js-restartButton">Restart</button>`);
    $('.restartButton').keypress(function(event) { 
      if (event.keyCode === 13) { 
        $('.restartButton').click(); 
      } 
    }); 
    $('.restartButton').click(function() { 
      event.preventDefault();
      location.reload();
    });
  }
}

function startQuiz() {
  let startPage = `<h3>Start Quiz</h3>
  <p>Test your knowledge!</p>
  <button type="button" class="startButton js-startButton">Start</button>`;

  $('.container').html(startPage);
  $('.startButtond').keypress(function(event) { 
    if (event.keyCode === 13) { 
      $('.startButton').click(); 
    } 
  }); 
  $('.startButton').click(function() { 
    let currentQuestion = STORE.questions.slice(0, 1);
    generateQuestion(currentQuestion, 0, 0);
  });
}

function evaluateAnswer(correct, selected) {
  let currentScore = $('.scoreNum').html();
  let incorrectText = `It is actually: ${correct}`;
  if (selected === correct) {
    $.alert({
      title: 'Correct!',
      content: 'Good Job!',
      boxWidth: '30%',
      useBootstrap: false,
    });
    let newScore = parseInt(currentScore) + 1;
    return newScore;
  }
  $.alert({
    title: 'Incorrect!',
    content: `${incorrectText}`,
    boxWidth: '30%',
    useBootstrap: false,
  });
  return currentScore;
}

function submitAnswer() {
  let counter = 0;
  $('.container').on('submit', function(event) {
    event.preventDefault();
    let currentId = $(event.currentTarget).find('fieldset').attr('id');
    let currentQuestion = STORE.questions.find(item => item.id === currentId);
    let answerValue = currentQuestion.correctAnswer;
    let selected = $('input[name=answer]:checked').val();
    counter++;
    let currentScore = evaluateAnswer(answerValue, selected);
    generateQuestion(currentQuestion, counter, currentScore);
  });
}



function doQuiz() {
  startQuiz();
  submitAnswer();
}

$(doQuiz);
