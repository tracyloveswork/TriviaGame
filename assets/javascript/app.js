// VARIABLES

// Question object
var quizQuestions = {
	question: ["What superhero was born with the Curse of Kordax?", "What super villain was created when Emil Blonsky accidentally exposed himself to a concentrated burst of gamma rays?", "What Chester Gould character made his first appearance in the Detroit Free Press on October 4, 1931?", "What superhero grew up on the planet Tamaran?", "Edwin Jarvis serves as butler to what superteam?", "Which of these superheroines was inhabited by the soul of an ancient Egyptian princess after attempting suicide?", "Who was the first costumed superhero?", "Who was Elvis Presley's favorite superhero?", "What year was the first modern comic book printed?", "Who is Luke Cage's best friend and longtime partner in crime-fighting?"],
	answer1: ["Hawkman","Doc Samson", "Buck Rogers", "Ultra Boy", "Fantastic Four", "Hawkgirl", "Crimson Avenger", "Captain Marvel Jr.", "1993", "Daredevil"],
	answer2: ["Aquaman","Abomination", "Superman", "The Silver Surfer", "Justice League", "Wonder Woman", "The Phantom", "Silver Surfer", "1925", "Human Torch"],
	answer3: ["Ghost Rider","The Leader", "Dick Tracy", "Starfire", "Avengers", "Huntress", "Superman", "The Green Hornet", "1917", "Doctor Strange"],
	answer4: ["Captain Marvel","Bi-Beast", "Flash Gordon", "Hawkgirl", "Teen Titans", "Black Canary", "Arrow", "Batman", "1938", "Iron Fist"],
	legend: [2, 2, 3, 3, 3, 1, 2, 4, 1, 4]
}

//  Set our number counter to 120 seconds.
    var number = 90;

    // Variable for converter from class activity
    var timeDisplay;

    //  Variable that will hold our interval ID
    var intervalId;

    // Count of how many questions answered correctly
    var correct = 0;

    // Count of how many questions answered incorrectly
    var incorrect = 0;

    // Count of how many questions not answered
    var notAnswered = 0;

    // Buttons

    $("#start").click(start);
    $("#done").click(timeUp);

// FUNCTIONS

//  The start function sets an interval and starts the countdown
    
    function start() {

      // Run the decrement function once a second
      intervalId = setInterval(decrement, 1000);

      // Changes start button display to none
      // document.getElementById("start").style.display = "none";
      $("#start").hide();
   
      // Changes timer display to block
      $("#timer").show();

      // Loads quiz
      $("#questionBlock").show();
      displayQuiz();

      // Show done button
      $("#done").show();
    }

    //  The decrement function.
    function decrement() {

      // Convert number
      timeDisplay = timeConverter(number);

      //  Show the number in the #timer tag.
      // $("#timer").html(number + " seconds");
      $("#timer").html(timeDisplay);

      //  Decrease number by one.
      number--;

      //  Once number hits zero...
      if (number === 0) {

      // Stop timer and show results
      timeUp();
      }
    }

    // Loads the quiz from the array

    function displayQuiz() {

      for (i=0; i<quizQuestions.legend.length; i++) {

        console.log(i);
        console.log(quizQuestions.question[i]);

        $("#questionBlock").append("<div class=\"panel panel-default\"><div class=\"panel-heading\"><h3 class=\"panel-title\">" + quizQuestions.question[i] + "</h3></div><div class=\"panel-body\"><div id=\"answers" + i + "\"><label id=\"answer1Label" + i + "\" class=\"radio-inline\"><input type=\"radio\" name=\"answerOptions" + i + "\" value=\"1\" id=\"answer1" + i + "\">" + quizQuestions.answer1[i] + "</label><label id=\"answer2Label" + i + "\" class=\"radio-inline\"><input type=\"radio\" name=\"answerOptions" + i + "\" value=\"2\" id=\"answer2" + i + "\">" + quizQuestions.answer2[i] + "</label><label id=\"answer3Label" + i + "\" class=\"radio-inline\"><input type=\"radio\" name=\"answerOptions" + i + "\" value=\"3\" id=\"answer3" + i + "\">" + quizQuestions.answer3[i] + "</label><label id=\"answer4Label" + i + "\" class=\"radio-inline\"><input type=\"radio\" name=\"answerOptions" + i + "\" value=\"4\" id=\"answer4" + i + "\">" + quizQuestions.answer4[i] + "</label></div></div></div>");
      }
    }

    function getResults() {

      // Get value of checked radio for each question

      for (i=0; i<quizQuestions.legend.length; i++) {

        var answerName = 'answerOptions' + i;

        console.log(answerName);

        var radios = document.getElementsByName(answerName);

        console.log(radios);

        for (var j = 0, length = radios.length; j < length; j++) {

          if (radios[j].checked) {

            console.log(radios[j].value);
          
            // Compare value with answer
            if (radios[j].value == quizQuestions.legend[i]) {

              correct++;

            } else {

              incorrect++;
            } 

          // only one radio can be logically checked, don't check the rest
          break;

          }

        }
 
      }

      // Check for unanswered values
      notAnswered = quizQuestions.legend.length - (correct + incorrect);

      // Update values
      $("#correct").html(correct);
      $("#incorrect").html(incorrect);
      $("#notAnswered").html(notAnswered);
    }
  


    // Clears quiz and shows results

    function timeUp() {

      // Stop interval loop
      clearInterval(intervalId);

      // hide timer
      $("#timer").hide();

      // hide quiz
      $("#quizBody").hide();

      // hind done button
      $("#done").hide();

      // swap status copy
      $("#status").text("All done!");

      // calculate results
      getResults();

      // show results
      $("#quizResults").show();
    }


// Time Converter from stopwatch activity

  function timeConverter(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }

