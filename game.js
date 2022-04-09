var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(".start-game").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour)
  playSound(randomChosenColour);
}

$(".button").click(function (){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(colour) {
  var path = "sounds/"+colour+".mp3";
  var sound = new Audio(path);
  sound.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
      $("#"+currentColour).removeClass("pressed");
    }, 300);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

   // console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  }
  else {
    var sound = new Audio('sounds/wrong.mp3');
    sound.play();
    $('body').addClass("game-over");

    setTimeout(function () {
      $('body').removeClass("game-over");
    }, 200);
    $('#level-title').text("Click here to restart the game");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
