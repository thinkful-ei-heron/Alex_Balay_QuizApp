'use strict';

const STORE = {
  questions: [
    {id: cuid(), questionNum: 1, question: 'What does Rick use to travel between dimensions and universes?', answers:[ 'space laser', 'portal gun', 'tardis', 'universe key'], correctAnswer: 'portal gun', image: 'photos/img1.jpg'},
    {id: cuid(), questionNum: 2, question: 'What did Jerry ask Mr. Meeseeks for?', answers:[ 'answer1', 'answer2', 'answer3', 'two strokes off his golf game'], correctAnswer: 'two strokes off his golf game', image: 'photos/img6.jpg'},
    {id: cuid(), questionNum: 3, question: 'What is the name of the park that Rick builds inside an Australian homeless man?', answers:[ 'Anatomy Park', 'answer2', 'answer3', 'answer4'], correctAnswer: 'Anatomy Park', image: 'photos/img9.jpg'},
    {id: cuid(), questionNum: 4, question: 'Who is the worst person alive?', answers:[ 'answer1', 'Tammy', 'answer3', 'answer4'], correctAnswer: 'Tammy', image: 'photos/img10.png'},
    {id: cuid(), questionNum: 5, question: 'Who is Morty based on?', answers:[ 'answer1', 'answer2', 'answer3', 'Marty from Back to the Future'], correctAnswer: 'Marty from Back to the Future', image: 'photos/img2.jpg'}
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
    `<img src="${nextQuestion.image}" alt="photo of rick and morty" class="questionImage"/>
    <form class="submitAnswer">
    <fieldset id="${nextQuestion.id}">
            <legend class="questionText">${nextQuestion.question}</legend>
            <input type="radio" name="answer" id="answer1" value="${nextQuestion.answers[0]}" required>
            <label class="inputButton" for="answer1">${nextQuestion.answers[0]}</label>
            <br>
            <input type="radio" name="answer" id="answer2" value="${nextQuestion.answers[1]}">
            <label class="inputButton" for="answer2">${nextQuestion.answers[1]}</label>
            <br>
            <input type="radio" name="answer" id="answer3" value="${nextQuestion.answers[2]}">
            <label class="inputButton" for="answer3">${nextQuestion.answers[2]}</label>
            <br>
            <input type="radio" name="answer" id="answer4" value="${nextQuestion.answers[3]}">
            <label class="inputButton" for="answer4">${nextQuestion.answers[3]}</label>
    </fieldset>
    <div class="submitAnswerButton"><button type="submit" >Submit</button></div>
  </form>`;
    $('.logo').empty();
    $('.score').html(newHeader);
    $('.container').html(questionText);
    

  } else {
    $('.logoScore').empty();
    if (currentScore === 5) {
      $('.container').html(`
      <img src="photos/img8.png" alt="a picture of rick sanchez" class="questionImage">
      <h3>Your score is ${currentScore}/5</h3>
      <p class="comment">You a member of the Council of Ricks.</p>
      <button type="button" class="restartButton js-restartButton">Restart</button>`);
    }
    else if (currentScore >= 3) {
      $('.container').html(`
      <img src="photos/img7.png" alt="a picture of birdperson" class="questionImage">
      <h3>Your score is ${currentScore}/5</h3>
      <p class="comment">You are pretty good.</p>
      <button type="button" class="restartButton js-restartButton">Restart</button>`);
    }
    else if (currentScore < 3){
    $('.container').html(`
    <img src="photos/img5.jpg" alt="a picture of jerry" class="questionImage">
      <h3>Your score is ${currentScore}/5</h3>
      <p class="comment">Okay, Jerry.</p>
      <button type="button" class="restartButton js-restartButton">Restart</button>`);
    }
    
    
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
  let startPage = `
  <img class="questionImage" src="photos/img3.jpg" alt="rick and morty logo"/>
  <p>Let's go. In and out. Twenty minute adventure.</p>
  <button type="button" class="startButton js-startButton">Show Us What You've Got</button>`;

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
  let incorrectText = `It is: ${correct}`;
  if (selected === correct) {
    $.alert({
      title: 'Correct!',
      content: 'Good Job!',
      boxWidth: '60%',
      useBootstrap: false,
      theme: 'Modern',
    });
    let newScore = parseInt(currentScore) + 1;
    return newScore;
  }
  $.alert({
    title: 'Incorrect!',
    content: `${incorrectText}`,
    boxWidth: '60%',
    useBootstrap: false,
    theme: 'Modern',
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
