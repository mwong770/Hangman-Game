
var wordOptions = ["horse", "gorilla", "cat", "dog", "moose", "deer", "tiger", "wolf", "bear", "racoon", "skunk", "parrot",
                   "fox", "rabbit", "owl", "lion", "toucan", "sloth", "snake", "bat"];

var wins = 0;
var losses = 0;
var guessesLeft = 9;
var guesses = [];
var chosenWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
var splitWord = chosenWord.split("");
var spaceholder = new Array();

reset();

function reset() {
    guessesLeft = 9;
    guesses = [];
    chosenWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    splitWord = chosenWord.split("");
    console.log(chosenWord);
    spaceholder = [];
    // replaces chosenWord letters with '_'
    for(var i = 0; i < chosenWord.length; i++){
      spaceholder[i]= '_ ';
    }
    /*.join('') joins the elements of the spaceholder array into a string 
   and removes the comma separator between letters*/
    document.getElementById("wordChosen").innerHTML = spaceholder.join('');
    document.getElementById("swingMonkey").style.display = '';
    document.getElementById("groundMonkey").style.display = 'none';
    document.getElementById("midMonkey").style.display = 'none'; 
    document.getElementById("replayButton").style.display = 'none';
    document.getElementById("greatJob").style.display = 'none';
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("guessesMade").innerHTML = guesses.join(' ');
    document.getElementById("snackbar").style.display = 'none';
}

function reload() {
        wordOptions = ["horse", "gorilla", "cat", "dog", "moose", "deer", "tiger", "wolf", "bear", "racoon", "skunk", "parrot",
                       "fox", "rabbit", "owl", "lion", "toucan", "sloth", "snake", "bat"];
        wins = 0;
        losses = 0;
        document.getElementById("wins").innerHTML = wins;
        document.getElementById("losses").innerHTML = losses;
        reset();
}

function showGroundMonkey() {
      document.getElementById("swingMonkey").style.display = 'none';
      document.getElementById("midMonkey").style.display = 'none';
      document.getElementById("groundMonkey").style.display = '';
}

function showMidMonkey() {
      document.getElementById("swingMonkey").style.display = 'none';
      document.getElementById("groundMonkey").style.display = 'none';
      document.getElementById("midMonkey").style.display = '';
}

//If in array, return true
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function toast(message) {
        document.getElementById("snackbar").style.display = '';
        document.getElementById("snackbar").innerHTML = message;
}

function clearToast() {
        document.getElementById("snackbar").style.display = 'none';
}

var began = false; 

document.onkeyup = function(event) {

    if (began) {
        var userGuess = event.key;

        //If key pressed is a letter
	        if (event.keyCode >= 65 && event.keyCode <= 90){

		            //If the letter already entered, let user know
		            if (isInArray(userGuess.toUpperCase(), guesses)) {
                        toast("You have already entered this letter!");
                        setTimeout('clearToast()', 1500);

                    //if letter not already entered, add it to the guesses array and subtract 1 from guessesLeft
		            } else {
        	               guesses.push(userGuess.toUpperCase());
        	               guessesLeft--;
    		        }
            //if the key pressed is not a letter, toast to press a letter
            }   else {
    		            toast("Please enter a letter.");
                        setTimeout('clearToast()', 1500);
    	        }

        for (var i = 0; i < splitWord.length; i++) {
    	     if (userGuess == splitWord[i]) {
    		        spaceholder[i] = userGuess;
    		        document.getElementById("wordChosen").innerHTML = spaceholder.join(' ');
    	     }

            if (spaceholder == splitWord) {
            }

        }

        if (guessesLeft === 0) { 
            losses++;

            showMidMonkey();          
            setTimeout('showGroundMonkey()', 100);
            setTimeout('reset()', 800);

        } //ends if guessesLeft === 0 

        wincounter = 0;
    
        for (i = 0; i < spaceholder.length; i++) {
              if (spaceholder[i].toUpperCase() == splitWord[i].toUpperCase()) {
              wincounter++;
              }
        }

        if (wincounter == spaceholder.length) {
                wins++;

                for (i = 0; i < wordOptions.length; i++) {
                        if (chosenWord == wordOptions[i]) {
                            wordOptions.splice(i, 1);
                        }
                }

                if (wordOptions.length > 0) {
                        setTimeout('reset()', 1200);
                }

                console.log("after win " + wordOptions.length);

                if (wordOptions.length == 0) {
                        document.getElementById("replayButton").style.display = '';
                        document.getElementById("greatJob").style.display = '';
                }
        }

        document.getElementById("wins").innerHTML = wins;
        document.getElementById("losses").innerHTML = losses;
        document.getElementById("guessesLeft").innerHTML = guessesLeft;
        document.getElementById("guessesMade").innerHTML = guesses.join(' ');

} //ends if game began
    else {
        began = true;
        var player = document.getElementById("backgroundMusic");
        player.loop = true;
        player.play();
    }

}; //ends onkeyup





