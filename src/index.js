// DESCRIPTION OF PROJECT
// A TRIVIA GAME POWERED BY THE OPEN TRIVIA API

// MVP
// 1. A LANDING PAGE THAT CONTAINS A FORM FOR GAME CUSTOMIZATION
// 2. QUESTIONS ARE PRESENTED TO THE USER UNTIL ALL QUESTIONS ARE COMPLETED
// 3. ANSWERS/SCORE ARE RECORDED AND PRESENTED TO USER AT THE END




// Pseudo code


// Set up global namespace object as well as init function
const app = {};


// Set up global namespaces variables as well as event listeners - score - timer - questionNumber - questionsArray - query selector for questions div
app.score = 0;
app.timer;
app.questionNumber = 0;
app.questions = [];
app.firstRun = true;
app.numOfCorrect = 0;
app.welcomeScreen = document.querySelector('.welcome');
app.dots = document.querySelector('#dots');
app.gameScreen = document.querySelector('.game');
app.gameSection = document.querySelector('.questionAnswers');
app.gameStats = document.querySelector('.gameStats');
app.timerDisplay = document.querySelector('#timer');
app.scoreDisplay = document.querySelector('#score');
app.questionCounterDisplay = document.querySelector('#questionsCounter');

// Add event listener for landing page form to get game options from user 
app.getUserOptions = () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const category = document.querySelector('#category').value;
        const difficulty = document.querySelector('#difficulty').value;
        app.numOfQuestions = document.querySelector('#numberOfQuestions').value;
        app.welcomeScreen.style.display = 'none';
        app.gameScreen.style.display = 'block';
        app.loadingScreen();
        app.apiCall(category, difficulty, app.numOfQuestions);
    })
}



// Take this data and use it to create a URL object to pass to our fetch request

// Create fetch request, passing URL object, get response and take the results array and remap to a new array with each index being an object containing answer, incorrect answers and question.

app.apiCall = (categoryOption, difficultyOption, numOfQuestions) => {
    const apiUrl = new URL('https://opentdb.com/api.php');
    apiUrl.search = new URLSearchParams({
        amount: numOfQuestions,
        category: categoryOption,
        difficulty: difficultyOption,
        type: 'multiple'
    });

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(res.status)
            }
        })
        .then(res => {
            if (res.results.length !== 0) {
                app.questions = res.results.map(question => {
                    question.incorrect_answers.push(question.correct_answer);
                    return {
                        wrongAnswers: question.incorrect_answers,
                        correctAnswer: question.correct_answer,
                        question: question.question
                    };
                })
            } else {
                throw new Error('No Results')
            }
        })
        .then(app.intervalID = setInterval(app.timerInterval, 1000))
        .catch(err => {
            if (err == 'Error: No Results') {
                app.gameScreen.classList.toggle('hidden');
                app.gameScreen.innerHTML = `<h2>Sorry, apparently there are no questions available, please try a different category. <a href="index.html"> Back to Home </a></h2>`
            } else {
                app.gameScreen.classList.toggle('hidden');
                app.gameScreen.innerHTML = `<h2>Sorry, something went wrong. <a href="index.html"> Back to home </a></h2>`;
            }
        });

}

////// show a loading screen while data is fetched from the API
///// called line 45 directly before API call


app.loadingScreen = () => {
  
  let dotCounter = 0;
  setInterval(() => {
    if(dotCounter < 3) {
      app.dots.innerText += ' . ';
      dotCounter++;
    } else {
      app.dots.innerText = '';
      dotCounter = 0;
    }
  }, 500);
}





app.displayResults = () => {
    app.userAnswer = '';
    app.gameSection.innerHTML = '';
    app.firstRun = false;
    app.newQuestion = document.createElement('h2')
    app.newAnswers = document.createElement('ul');
    app.currentQuestion = app.questions[app.questionNumber];
    app.currentQuestion.wrongAnswers.sort();
    app.newQuestion.innerHTML = app.currentQuestion.question;
    app.currentQuestion.wrongAnswers.forEach((answer, index) => {
        const answerHTML = document.createElement('li');
        answerHTML.innerHTML = `<p>${answer}</p>`;
        answerHTML.classList.add('answer', `answer${index}`);
        app.newAnswers.append(answerHTML)
    })
    app.gameSection.append(app.newQuestion, app.newAnswers);
    app.questionCounterDisplay.textContent = `Question number: ${app.questionNumber + 1}`;
    app.checkAnswer();
}


// a function that adds event listeners to the answer elements after they are painted to the page -- if clicked, app.score is incremented else not
app.checkAnswer = () => {
    app.newAnswers.addEventListener('click', function (e) {
        app.userAnswer = e.target.textContent;
        const isCorrect = document.createElement('p');
        if (app.userAnswer === app.currentQuestion.correctAnswer) {
            app.score += 100 + ((app.timer * app.timer) / 2);
            isCorrect.textContent = 'correct';
            e.target.append(isCorrect);
            app.numOfCorrect++;
            app.questionNumber++;
            app.scoreDisplay.textContent = `Score: ${app.score}`;
        } else {
            isCorrect.textContent = 'wrong';
            e.target.append(isCorrect);
            app.questionNumber++;
            app.scoreDisplay.textContent = `Score: ${app.score}`;
        }
    })

}

// create a setInterval function that will check whether the game is being run for the first time, as well as whether our timer has reached 0 and questions remain or not. 


app.timerInterval = () => {

    //If questions remain and timer has reached zero or first run is true, then run display function, reset timer to original start and increase question number. If questions remaining is 0 and timer has reached 0, present user with final score and ask if they want to play again.

    if (app.questionNumber === app.questions.length && app.userAnswer || app.questionNumber === app.questions.length - 1 && app.timer === 0) {
        //game over
        clearInterval(app.intervalID);
        const endScreen = document.querySelector('#endScreenText');
        endScreen.innerHTML = `
            <p>${app.numOfCorrect}/${app.numOfQuestions} questions correct.</p>
            <p>Final Score: ${app.score}</p>
            <a href="index.html">Play Again</a>`;
        document.querySelector('.endGameModal').classList.remove('hidden');
    } else if (app.timer === 0 && app.questionNumber < app.questions.length - 1) { //Checks if timer has run out without an answer being given and advances to next question
        app.questionNumber++;
        app.displayResults();
        app.timer = 30;
    } else if (app.firstRun === true || app.userAnswer) {
        //display next question and reset timer
        setTimeout(() => {
            app.displayResults();
        }, 1000);
        app.timer = 30;
    }

    app.timerDisplay.textContent = `Time Left: ${app.timer--}`;

}

app.init = () => {
    app.getUserOptions();
}

app.init();













//  The form contains some dropdowns that shape the type of trivia game they would like to play. They can choose between category and difficulty. User presses a submit button once they have selected their game options and they are snap scrolled 100vh down to the the game area.

// The submitted data is used to create an api call to the trivia API. The response from the API data is stored in a variable such as app.questions. For each question, the data will be display on the page for the user. An h2 heading will display the questions followed by a ul containing 3 wrong answers and 1 right answer in randomized order. An event listener is set on each. When the user clicks on an answer, their answer/score is stored in a variable and the next question in the questions array is immediately painted to the screen.

// This continues until all questions are complete. The user is then presented with their score/total.
// A play again button is presented giving the user the option to play again.


// STRETCH


// Implement site tokens to improve reusability - maybe localstorage?
// the API supports a 6 hour token that prevents a user from generating the same questions more than once

// A timer that starts at the beginning of each question.

// A score that is calculated based on the correctness of answer and time remaining.

// More complex play again button at the end of the game.

// Social sharing option to challenge friends to beat their score

// Add sound effects/music

// convert to react after the completion of bootcamp to make it a better portfolio piece - stolen from tasnia and hal

// add feedback to show that user on on a hot streak

// loader 