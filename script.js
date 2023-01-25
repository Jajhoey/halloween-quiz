document.addEventListener('DOMContentLoaded', () => {
  const question = document.querySelector('.question')
  const answerText = document.querySelector('.answer-text')
  const answerButtons = document.getElementById('answer-choices')
  const imageButtons = document.getElementById('image-choices')
  const startButton = document.getElementById('start-button')
  const questionBackground = document.getElementById('question-background')
  const submitForm = document.getElementById('submitForm')
  const submitButton = document.getElementById('submitButton')
  const finalScore = document.getElementById('finalScore')
  const inputText = document.getElementById('userInput')
  const redoQuiz = document.getElementById('redoQuiz')
  const redoButton = document.getElementById('redoButton')
  var score = 0
  var index = 0

  const questions = [
    {
      question: 'What is the name of the witch that becomes friends with Casper the Friendly Ghost?',
      answers: [
        {text: 'Wendy'},
        {text: 'wendy'}
      ],
      type: 'textInput'
    },
    {
      question: 'When do werewolves transform?',
      answers: [
        {text: 'During a lunar eclipse', correct: false},
        {text: 'On a full moon', correct: true},
        {text: 'At any time', correct: false},
        {text: 'When they drink coffee', correct: false}
      ],
      type: 'buttonInput'
    },
    {
      question: "Which of these classic horror series features the battle between Laurie Strode and Michael Myers?",
      answers: [
        {title: 'The Exorcist', src: 'http://www.gstatic.com/tv/thumb/v22vodart/6107/p6107_v_v8_ay.jpg', correct: false},
        {title: 'Halloween', src: 'http://www.gstatic.com/tv/thumb/v22vodart/3499/p3499_v_v8_ab.jpg', correct: true},
        {title: 'Scream', src: 'http://www.gstatic.com/tv/thumb/v22vodart/18852/p18852_v_v8_ac.jpg', correct: false},
        {title: 'Psycho', src: 'http://www.gstatic.com/tv/thumb/v22vodart/283/p283_v_v8_ad.jpg', correct: false}
      ],
      type: 'imgInput'
    },
    {
      question: 'What language does the word "Poltergeist" come from?',
      answers: [
        {text: 'Hungarian', correct: false},
        {text: 'Swedish', correct: false},
        {text: 'German', correct: true},
        {text: 'Dutch', correct: false}
      ],
      type: 'buttonInput'
    },
    {
      question: 'Which of the following would be useful if facing a vampire?',
      answers: [
        {text: 'Garlic', correct: true},
        {text: 'Silver coin', correct: false},
        {text: 'Lemonade', correct: false},
        {text: 'A pair of gloves', correct: false}
      ],
      type: 'buttonInput'
    }

  ]

  questionBackground.classList.add('hidden')
  startButton.onclick = startQuiz
  submitButton.onclick = nextQuestion
  submitButton.addEventListener('click', submitAnswer)
  redoButton.addEventListener('click', reloadPage)


  function startQuiz(){
    console.log('startQuiz')
    printScore
    startButton.classList.add('hidden')
    questionBackground.classList.remove('hidden')
    loadQuestions(questions[index])
  }

  function nextQuestion(){
    if (index < 5){
      loadQuestions(questions[index])
    }
    else {
      questionBackground.classList.add('hidden')
      finalScore.classList.remove('hidden')
      redoQuiz.classList.remove('hidden')

      printScore()
    }
  }

  function selectAnswer(e){
    if(e.target.classList.contains('correct')){
      score++
    }
  }

  function submitAnswer(e){
    if(inputText.value === "Wendy" || inputText.value === "wendy") {
      score++
    }
  }

  function loadQuestions(e){
    console.log("Index: " + index)
    console.log('Loading question')
    //For button input questions
    if(e.type == 'buttonInput'){
      clearButtons()
      clearForm()
      question.innerText = e.question
      e.answers.forEach(answer => {
        const newButton = document.createElement('button')
        newButton.innerText = answer.text
        newButton.correct = answer.correct
        newButton.classList.add('button')
        newButton.classList.add('answer-button')
        newButton.addEventListener('click', selectAnswer)
        newButton.addEventListener('click', nextQuestion)

        if(answer.correct){
          newButton.classList.add('correct')
        }
        answerButtons.appendChild(newButton)
      })

    }
    //For image input questions
    else if (e.type == 'imgInput') {
      clearButtons();
      clearForm()
      question.innerText = e.question
      var i = 0
      e.answers.forEach(answer => {
        const newButton = document.createElement('button')
        newButton.classList.add('imageButton')
        imageButtons.appendChild(newButton)
        newButton.addEventListener('click', selectAnswer)
        newButton.addEventListener('click', nextQuestion)
        newButton.style.width = "200px"
        newButton.style.height = "300px"
        newButton.style.backgroundSize = 'contain'

        if(answer.correct){
          newButton.classList.add('correct')
        }

        //Styling each newly created button with an image background
        //depending on its title
        if (answer.title == 'The Exorcist') {
          newButton.style.backgroundImage = "url('http://www.gstatic.com/tv/thumb/v22vodart/6107/p6107_v_v8_ay.jpg')"
        }

        else if (answer.title == 'Halloween') {
          newButton.style.backgroundImage = "url('http://www.gstatic.com/tv/thumb/v22vodart/3499/p3499_v_v8_ab.jpg')"
        }

        else if (answer.title == 'Scream') {
          newButton.style.backgroundImage = "url('http://www.gstatic.com/tv/thumb/v22vodart/18852/p18852_v_v8_ac.jpg')"
        }

        else{
          newButton.style.backgroundImage = "url('http://www.gstatic.com/tv/thumb/v22vodart/283/p283_v_v8_ad.jpg')"
        }
      })

    }

    //For text input questions
    else{
      clearButtons();
      question.innerText = e.question
    }
    console.log(inputText.value)
    console.log('Score: ' + score)
    index++

  }

  //This function will hide all buttons on the questionBackground
  function clearButtons(){
    while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild)
    }
    while(imageButtons.firstChild){
      imageButtons.removeChild(imageButtons.firstChild)
    }
  }

  function clearForm(){
    answerText.classList.add('hidden')
  }

  function printScore(){
    if (score>3){
      finalScore.innerText = "You Passed! Score - " + score + "/5"
    }

    else{
      finalScore.innerText = "You Failed :( Score - " + score + "/5"
    }
  }

  function reloadPage(){
    location.reload()
  }
})
