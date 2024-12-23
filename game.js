
const gamePatern = [];
let userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let gameStarted = false;
let level = 0;

//detect keypress to start the game
$(document).on('keydown', function(event) {
    //console.log(event.key);
    if (!gameStarted && event.key == "a") {
        startGame();
    }
});

function startGame() {
    //setting every parameter to default
    gamestarted = true;
    level = 0;
    gamePatern.length = 0;

    //adding some time before starting the game
    nextSequence();
}

function nextSequence() { 
    // console.log("game started")
    // reset user input for new sequence
    userClickedPattern = [];

    //changing the heading to show current level
    level++;
    $("h1").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    //console.log(randomNumber);

    var randomChosenColor = buttonColours[randomNumber];
    //console.log(randomChosenColor);
    setTimeout( function() {
        animatePress(document.getElementById(randomChosenColor));
    }, 1000)

    gamePatern.push(randomChosenColor);
    //console.log(gamePatern);
   
}

//user clicks a btn
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    //console.log(userChosenColor);

    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);

    //adding effects
    soundEffect(userChosenColor);
    animatePress(this);

    //checks users latest input
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentIndex) {
    //cheching the last clicked btn by user with games pattern
    if (userClickedPattern[currentIndex] === gamePatern[currentIndex]) {
        //making sure that both arrays have same number of elements in them
        if (userClickedPattern.length === gamePatern.length) {
            //adding some delay before next round starts
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    // changing the game heading
    $("h1").text("Game Over, Press A Key To Restart");
    soundEffect("wrong");

    // reseting game
    gameStarted = false;
}

//play the audio unique to each button when pressed
function soundEffect(color) {
    let audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}

//adding Animation to user click
function animatePress(currentColor) {
    
    /// split makes the elements in array distinguished, so pressed is a unique class
    currentColor.classList.add("pressed"); 

    /// adding a delay of 0.1s before removing the pressed class
    setTimeout( function(){
        currentColor.classList.remove("pressed");
    }, 100)
}