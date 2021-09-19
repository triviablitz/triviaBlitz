









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
app.timer = 30;
app.questionNumber;
app.questions = [];
app.firstRun = true;

app.welcomeScreen = document.querySelector('.welcome');
app.gameScreen = document.querySelector('.game');
app.gameSection = document.querySelector('.questionAnswers');

// Add event listener for landing page form to get game options from user 
app.getUserOptions = () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const category = document.querySelector('#category').value;
        const difficulty = document.querySelector('#difficulty').value;
        const numOfQuestions = document.querySelector('#numberOfQuestions').value;
        app.welcomeScreen.style.display = 'none';
        app.gameScreen.style.display = 'block';
        app.apiCall(category, difficulty, numOfQuestions);
    })
}



// Take this data and use it to create a URL object to pass to our fetch request

// Create fetch request, passing URL object, get response and take the results array and remap to a new array with each index being an object containing answer, incorrect answers and question.

app.apiCall = (categoryOption, difficultyOption, numOfQuestions) => {
    const apiUrl = new URL('https://opentdb.com/api');
    apiUrl.searchParams = new URLSearchParams({
        amount: numOfQuestions,
        category: categoryOption,
        difficulty: difficultyOption,
        type: 'multiple'
    });
    // fetch(apiUrl, {mode: 'no-cors'})
    fetch(`https://opentdb.com/api.php?amount=${numOfQuestions}&category=${categoryOption}&difficulty=${difficultyOption}&type=multiple`)
    .then(response => response.json())
    .then(res => {
        console.log(res);
        app.questions = res.results.map(question => {
            console.log(question);
            question.incorrect_answers.push(question.correct_answer);
            return {
                wrongAnswers: question.incorrect_answers,
                correctAnswer: question.correct_answer,
                question: question.question
            };
    });
})
    
    .then(() => {
        console.log(app.questions)
    });
}




app.init = () => {
    app.getUserOptions();
}

app.init();


// create a setInterval function that will check whether the game is being run for the first time, as well as whether our timer has reached 0 and questions remain or not. 

//create display function. Create new element on page for storing questions and answers.
// clear this element each time this function is run
//take the answers array and sort in order to randomize order, then assign these answers to the innerHTML of the newly created element.
// Use the questions value to create a header
//append both elements to the required section


//If questions remain and timer has reached zero or first run is true, then run display function, reset timer to original start and increase question number. If questions remaining is 0 and timer has reached 0, present user with final score and ask if they want to play again.











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
