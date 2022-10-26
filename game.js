var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;
var started = false;

$(document).on("keydown",function(){
    if(!started){
      started=true;
      startMajo();
    }
});
// {
//   if (!started) {
//
//     $("#level-title").text("Level " + level);
//     startMajo();
//     started = true;
//
//   }
// });
$(document).on("click",function(){
  if(!started){
    started=true;
    startMajo();
  }
});
$(".btn").on("click", function(){

    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function startMajo(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
  //$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function checkAnswer(i){
     if(gamePattern[i]===userClickedPattern[i]){
     console.log("success");

        if(gamePattern.length===userClickedPattern.length){
                         userClickedPattern = [];

                         setTimeout(function(){
                           playSound("correct");},500);
                         setTimeout(function(){
                           startMajo();},1000);
        }
   }
   else{
     console.log("failed");
     $("#level-title").text("Game Over, Press Any Key to Restart");
     playSound("wrong");
     $("body").addClass("game-over");
     setTimeout(function(){
       $("body").removeClass("game-over");}, 200);

    startOver();

   }

}

function startOver(){

    level = 0;
    started = false;
    gamePattern = [];

}

function animatePress(currentColour){
      $("#"+currentColour).addClass("pressure");
      setTimeout(function() {
            $("#"+currentColour).removeClass("pressure");  }, 100);
}

function playSound(name){
  var musicPlay = new Audio("sounds/"+name+".mp3")
  musicPlay.play();
}
