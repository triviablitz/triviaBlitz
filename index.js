
// DESCRIPTION OF PROJECT
// A TRIVIA GAME POWERED BY THE OPEN TRIVIA API

// MVP
// 1. A LANDING PAGE THAT CONTAINS A FORM FOR GAME CUSTOMIZATION
// 2. QUESTIONS ARE PRESENTED TO THE USER UNTIL ALL QUESTIONS ARE COMPLETED
// 3. ANSWERS/SCORE ARE RECORDED AND PRESENTED TO USER AT THE END




// Pseudo code


// User opens the page to a landing page at the top followed by a center console that contains a form. The form contains some dropdowns that shape the type of trivia game they would like to play. They can choose between category and difficulty. User presses a submit button once they have selected their game options and they are snap scrolled 100vh down to the the game area.

// The submitted data is used to create an api call to the trivia API. The response from the API data is stored in a variable such as app.questions. For each question, the data will be display on the page for the user. An h2 heading will display the questions followed by a ul containing 3 wrong answers and 1 right answer in randomized order. An event listener is set on each. When the user clicks on an answer, their answer/score is stored in a variable and the next question in the questions array is immediately painted to the screen.

// This continues until all questions are complete. The user is then presented with their score/total.
// A play again button is presented giving the user the option to play again.


// STRETCH


// Implement site tokens to improve reusability. - maybe localstorage?

// A timer that starts at the beginning of each question.
// A score that is calculated based on the correctness of answer and time remaining.

// More complex play again button at the end of the game.

// Social sharing option to challenge friends to beat their score

// Add sound effects/music

// convert to react after the completion of bootcamp to make it a better portfolio piece - stolen from tasnia and hal

// add feedback to show that user on on a hot streak
