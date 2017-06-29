
var wordOptions = ["horse", "gorilla", "cat", "dog", "moose", "deer", "tiger", "wolf", "bear", "racoon", "skunk", "parrot",
                   "fox", "rabbit", "owl", "lion", "toucan", "sloth", "snake", "bat"];

var wins = 0;
var losses = 0;
var guessesLeft = 9;
var guesses = [];
var chosenWord = "";
var splitWord = "";
var spaceholder = [];
var began = false; 

// sets up new chosenWord
function reset() {
    guessesLeft = 9;
    guesses = [];
    chosenWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    // turns chosenWord into array of letters so can compare user guesses with it later
    splitWord = chosenWord.split("");
    console.log(chosenWord);
    spaceholder = [];
    // replaces chosenWord letters with array of spaces
    for(var i = 0; i < chosenWord.length; i++){
        spaceholder[i]= '_ ';
    }
    // displays spaces for new word, removes guesses, snackbar, & replay btn, & repositions monkey 
    document.getElementById("wordChosen").innerHTML = spaceholder.join("");
    document.getElementById("swingMonkey").style.display = "";
    document.getElementById("groundMonkey").style.display = "none";
    document.getElementById("midMonkey").style.display = "none"; 
    document.getElementById("replayButton").style.display = "none";
    document.getElementById("greatJob").style.display = "none";
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("guessesMade").innerHTML = guesses.join(" ");
    document.getElementById("snackbar").style.display = "none";
}

// called when click replay button
// makes all words available to guess, sets wins and losses to 0, & calls reset
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
    document.getElementById("swingMonkey").style.display = "none";
    document.getElementById("midMonkey").style.display = "none";
    document.getElementById("groundMonkey").style.display = "";
}

function showMidMonkey() {
    document.getElementById("swingMonkey").style.display = "none";
    document.getElementById("groundMonkey").style.display = "none";
    document.getElementById("midMonkey").style.display = "";
}

// if in array, returns true
function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function toast(message) {
    document.getElementById("snackbar").style.display = "";
    document.getElementById("snackbar").innerHTML = message;
}

function clearToast() {
    document.getElementById("snackbar").style.display = "none";
}

document.onkeyup = function(event) {

    // if not the first time press a key in the game...
    if (began) {

        var userGuess = event.key;

        // if key pressed is a letter, does the following
	    if (event.keyCode >= 65 && event.keyCode <= 90){

		    // if the letter already entered, lets user know
		    if (isInArray(userGuess.toUpperCase(), guesses)) {
                toast("You have already entered this letter!");
                setTimeout(clearToast, 1500);

                // if letter not already entered, adds it to the guesses array and subtracts 1 from guessesLeft
		    } else {
        	    guesses.push(userGuess.toUpperCase());
                if (guessesLeft > 0) {
        	        guessesLeft--;
                }
    		}
        // if the key pressed is not a letter, displays toast to press a letter
        }   else {
    		    toast("Please enter a letter.");
                setTimeout(clearToast, 1500);
    	}

        // loops thru array of chosenWord letters and replaces _ with letter if user guessed letter correctly
        for (var i = 0; i < splitWord.length; i++) {
    	    if (userGuess === splitWord[i]) {
    		    spaceholder[i] = userGuess;
    		    document.getElementById("wordChosen").innerHTML = spaceholder.join(" ");
    	    }

        }

        // increases losses and drops monkey if no more guesses left 
        if (guessesLeft === 0) {
            // prevents unintentional losses if the user clicks key really fast 
            guessesLeft = "";
            losses++;
            showMidMonkey();          
            setTimeout(showGroundMonkey, 100);
            setTimeout(reset, 800);
        } 

        wincounter = 0;
    
        // increases wincounter by number of letters guessed correctly
        for (i = 0; i < spaceholder.length; i++) {
            if (spaceholder[i].toUpperCase() === splitWord[i].toUpperCase()) {
                wincounter++;
            }
        }

        // if guessed all the letters in chosenWord, increases win
        if (wincounter === spaceholder.length) {
            wins++;

            // removes word correctly guessed from wordOptions
            for (i = 0; i < wordOptions.length; i++) {
                if (chosenWord === wordOptions[i]) {
                    wordOptions.splice(i, 1);
                }
            }

            // if guessed all the words, resets game
            if (wordOptions.length > 0) {
                setTimeout(reset, 1200); 
            }

            console.log("after win " + wordOptions.length);

            // if all words guessed, shows replay btn and great job gif
            if (wordOptions.length === 0) {
                document.getElementById("replayButton").style.display = "";
                document.getElementById("greatJob").style.display = "";
            }
        }

        // display current values 
        document.getElementById("wins").innerHTML = wins;
        document.getElementById("losses").innerHTML = losses;
        document.getElementById("guessesLeft").innerHTML = guessesLeft;
        document.getElementById("guessesMade").innerHTML = guesses.join(" ");

} 
    // if first time a key in the game, starts music
    else {
        began = true;
        var player = document.getElementById("backgroundMusic");
        player.loop = true;
        player.play();
    }

}; //ends onkeyup

reset();


