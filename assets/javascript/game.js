
var wordOptions = ["horse", "gorilla"];
var wins = 0;
var losses = 0;


   guessesLeft = 9;
   guesses = [];
   var chosenWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
   var splitWord = chosenWord.split("");
   console.log(splitWord);
   var spaceholder = new Array();
   for(var i = 0; i < chosenWord.length; i++){
	 spaceholder[i]= '_ ';
   }
   /*.join('') joins the elements of the spaceholder array into a string 
   and removes the comma separator between letters*/
   document.getElementById("wordChosen").innerHTML = spaceholder.join(''); 

function reset() {

// setTimeout(function() {
  //your code to be executed after 1 second


  guessesLeft = 9;
  guesses = [];
  chosenWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  splitWord = chosenWord.split("");
  console.log(splitWord);
  spaceholder = [];
    for(var i = 0; i < chosenWord.length; i++){
      spaceholder[i]= '_ ';
    }
  document.getElementById("wordChosen").innerHTML = spaceholder.join('');
}

//If in array, return index value
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

var began = false; 
document.onkeyup = function(event) {

if (began) {
    var userGuess = event.key;

    //If key pressed is an alphabet
	if (event.keyCode >= 65 && event.keyCode <= 90){

		                  //If the alphabet already entered
		                  if (isInArray(userGuess, guesses)) {

	  		                 // alert('Letter already entered');
		                  } 

			                 else {
        	                 guesses.push(userGuess.toUpperCase());
        	                 guessesLeft--;
    		                  }
                      }

    	else {
    		alert("Please enter a letter.");
    	}

    for (var i = 0; i < splitWord.length; i++) {
    	if (userGuess == splitWord[i]) {
    		spaceholder[i] = userGuess;
    
    		document.getElementById("wordChosen").innerHTML = spaceholder.join(' ');
    		console.log(spaceholder);
    		console.log(splitWord);
    	
    	}



    if (spaceholder == splitWord) {
    	console.log(splitWord);
    	console.log(spaceholder);
  
    }

    }



   
    if (guessesLeft === 0) {
        losses++;
        reset();
    }
console.log(spaceholder.length);
console.log(spaceholder);
console.log(splitWord);
wincounter = 0;
for (i = 0; i < spaceholder.length; i++) {

  if (spaceholder[i].toUpperCase() == splitWord[i].toUpperCase()) {
    wincounter++;
    }
}

console.log("wincounter: " + wincounter);
console.log("spaceholderLength: " + spaceholder.length)
console.log("wins: " + wins);

if (wincounter == spaceholder.length) {
  wins++;

  reset();
};

    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("guessesMade").innerHTML = guesses.join(' ');

}
else began = true;

// }, delayMillis);
}; 





