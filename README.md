# triviaBlitz

## What is it?
Pair-programming exercise for Juno College's Web Dev Immersive Bootcamp. A trivia game made with JavaSCript, CSS and HTML that allows a user to choose a category, number of questions and difficulty to be quizzed on using the Open Trivia API.

## How does it work?
The user is presented with a landing page that provides a form for game options, once filled out and submitted and API call is performed using fetch. The results are then stored into an array and displayed to the screen one at a time, with the answers being randomized. Additionally, we included a timer, so the faster users answer the more points get added to their score. This timer was done using setInterval with some game logic within the callback function that will check whether a user answered, ran out of time or if all the questions have been answered. At this point, the user will either be presented with the next question, with their points added to their score or the end game screen will appear with a total score and replay button.



Check it out live at https://triviablitz.github.io/triviaBlitz/
