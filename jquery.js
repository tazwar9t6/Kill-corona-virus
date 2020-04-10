var playing = false;
var score;
var trialsLeft;
var step;
var action; //used for setInterval
var virus = ["corona1", "corona2", "corona3"];
$(function() {
  //click on start reset button

  $("#startreset").click(function() {
    //we are playing
    if (playing == true) {
      //reload page
      location.reload();
    } else {
      //we are not playing
      playing = true; //game initiated

      //set score to 0
      score = 0; //set score to 0
      $("#scoreValue").html(score);

      //show trials left
      $("#trialsLeft").show();
      trialsLeft = 3;
      addVaccines();

      //hide game over box
      $("#gameOver").hide();

      //change button text to reset game
      $("#startreset").html("Reset Game");

      //start sending viruses
      startAction();
    }
  });

  //kill a virus

  $("#virus1").mouseover(function() {
    score++;
    $("#scoreValue").html(score); //update score
    $("#audioSlice")[0].play(); //play sound

    //stop viruses
    clearInterval(action);

    //hide virus
    $("#virus1").hide("explode", 500); //kill viruses

    //send new virus
    setTimeout(startAction, 500);
  });

  //functions

  //fill trialLeft box with vaccines

  function addVaccines() {
    $("#vaccineContainer").empty();
    for (i = 0; i < trialsLeft; i++) {
      const newLocal = "<img src='images/vaccine.png' width='50px'>";
      $("#vaccineContainer").append(newLocal);
      }
  }

  //start sending viruses

  function startAction() {
    //generate a virus
    $("#virus1").show();
    chooseVirus(); //choose a random virus
    $("#virus1").css({ left: Math.round(550 * Math.random()), top: -50 }); //random position

    //generate a random step
    step = 7 + Math.round(2 * Math.random()); // change step

    // Move virus down by one step every 10ms
    action = setInterval(function() {
      //move virus by one step
      $("#virus1").css("top", $("#virus1").position().top + step);

      //check if the virus is too low
      if ($("#virus1").position().top > $("#virusContainer").height()) {
        //check if we have trials left
        if (trialsLeft > 1) {
          //generate a virus
          $("#virus1").show();
          chooseVirus(); //choose a random virus
          $("#virus1").css({ left: Math.round(550 * Math.random()), top: -50 }); //random position

          //generate a random step
          step = 1 + Math.round(5 * Math.random()); // change step

          //reduce trials by one
          trialsLeft--;
          $("#audioVaccineLoss")[0].play(); //play sound

          //populate trialsLeft box
          addVaccines();
        } else {
          // game over
          playing = false; //we are not playing anymore
          $("#startreset").html("Start Game"); // change button to Start Game
          $("#gameOver").show();
          $("#gameOver").html(
            "<p>Game Over!</p><p>Your score is " + score + "</p>"
          );
          $("#audioGameOver")[0].play(); //play sound

          $("#trialsLeft").hide();
          stopAction();
        }
      }
    }, 10);
  }

  // generate a random virus

  function chooseVirus() {
    $("#virus1").attr(
      "src",
      "images/" + virus[Math.round(2 * Math.random())] + ".png"
    );
  }

  //Stop dropping viruses

  function stopAction() {
    clearInterval(action);
    $("#virus1").hide();
  }
});
