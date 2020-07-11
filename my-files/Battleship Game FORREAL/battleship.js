var view = { //begin view object
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea"); // finds an element in the document object (aka the HTML page) with an ID of "message area" and assigns it's value as the local variable "message area" for this functio - ALSO - a local variable in this method has the same name as an element ID- is this common convention? probably. idk. lets find out sometime.
		messageArea.innerHTML = msg; //takes whatever you passed in as the msg argument and sets it as the value of whats inside the html tags of whatever element is called "message area" according to the variable declaration above
	},
	displayHit: function(location) {
		var cell = document.getElementById(location); //assign a variable called "cell" to the value of whatever element has the ID of the (location) argument 
		cell.setAttribute("class","hit"); //then assign that element's "class" attribute the value of "hit", which has a style defined in CSS properties 
	},
	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
		}
}; //end view object

var model = { //begin model object
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,

	ships: //all 3 ships are values in the "ships" array, as in ships[x] - each individual ship entry is AN OBJECT ITSELF containing its own arrays as properties 

		[ { locations: [0, 0, 0], hits: ["", "", ""] }, //first ship
		  { locations: [0, 0, 0], hits: ["", "", ""] }, //second ship
		  { locations: [0, 0, 0], hits: ["", "", ""] }  //third ship
		],

	generateShipLocations: function() { //will run until i is equal to numShips 
		var locations; //declare a var called locations 
		for (var i = 0; i < this.numShips; i++) { // i starts at 0, and as long as i is less than the number of ships specified by "numShips", do the following, then add 1 to i
			do {
				locations = this.generateShip() // execute the model's generateShip function (below) and assign it's returned value - an array of 3 values called newShipLocations - to the "locations" var...
			} while (this.collision(locations)); //...for as long the "collisions" function evaluates to true (or a truthy value) given the current "locations" object as a value (in other words, if there's a collision, go back to the top of the DO, which will run the generateShip function again)
			this.ships[i].locations = locations; // once we've generated locations that render collision FALSE when passed in as a param, set the value of "locations" in whatever "ship" object we're looking at, based on its index position in the "ships" array, to the value of the LOCAL var called "locations"
 		}
	}, //end generateShipLocations

	generateShip: function() { //create a function called generateShip; each time it's called, it will produce a random ship direction and use that to determine a series of numbers to return in an array called newShipLocations
		var direction = Math.floor(Math.random() * 2); // declare a local var called direction; set it to be equal to take a random decimal number times 2, rounded DOWN to the nearest integer which will be 0 or 1 cause MATH IS A FREAKING THING
		var row; //this and next line create empty vars that will hold the single digit for a starting ROW and COLUMN position 
		var col;
		if (direction === 1) { // Generate a starting location for a horizontal ship (2 SEPARATE digits stored as different vars, one being 0 -6, the other 0 - 4 so the numbers added keep the ship on the board!)
			row = Math.floor(Math.random() * this.boardSize); // setrow digit to be the rounded-down result of a random dec. between 0 - 1 times 7 (current size of board), which will be  0 - 6
			col = Math.floor(Math.random() * (this.boardSize - (this.shipLength +1))); // set col to be rounded down result of a random dec. between 0 - 1 times the boardsize value (7) minus the shiLength value (3) + 1
		} else { // only other option is that direction is 0; remember, direction will be created when/if and ONLY if this function is invoked
			row = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
			col = Math.floor(Math.random() * this.boardSize);// generate a starting location for a verticle ship
		}

		var newShipLocations = []; // creates an empty array WITHIN this function (generateShip)

		for (var i = 0; i < this.shipLength; i++) { //as long as i (starting at 0) is less than the value of shipLength, do what's below and then add 1 to i:
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i)); //horizontal ship 
			} else {
				newShipLocations.push((row + i) + "" + col);// add location to array for new VERTICLE ship 
			} 
		} //end for loop

		return newShipLocations; //returns an array w/ a number of values equal to the shipLength property

	}, //end generateShip

	collision: function(locations) { // create a function called collision that takes 1 paramter, named locations
		for (var i = 0; i < this.numShips; i++) {   //create a loop that iterates for as long as i, starting at 0, is less than the value of numShips (so in this case, 3 times - i = 0, i = 1, i = 2)
			var ship = model.ships[i]; //create a local variable called "ship" and assign it the value of whatever is at index position "i" in the "ships" array (this will be an object with 2 nested arrays)
			for (var j = 0; j < locations.length; j++) { //create a loop that iterates for as long as the value of the length of what was passed as the locations paramter (hint since it has a length probably either an array or string!); so, if passed a ship's location array, it'll loop 3 times, once for each location 
				if (ship.locations.indexOf(locations[j]) >= 0) { // if indexOf finds a value that matches whatever is at index position "J" - aka the current location we're looknig for, it will be equal to or greater than 0 (first possible array location), and if that's the case then...
					return true;
				} // end if statment 
			} //end second FOR loop (inspect each of the 3 values PER SHIP individually)
		} // end first FOR loop (grab each ship individually)
		return false
	},
		
	fire: function(guess) { //method to accept a guess value and iteratively compare it to values in the ship "locations" arrays; it does a BUNCH of stuff but the RETURN is a true or false value 

		for (var i = 0; i < this.numShips; i++) { //as long as i is less than the value of numShips, or how manys ships are in the game..
			var ship = this.ships[i]; //grab the value of whatever (its gonna be an object) is at index position i in the ships array and, for this pass of this function, call it "ship"
			var index = ship.locations.indexOf(guess); // if the "guess" argument matches the value of a spot in the "loctions" array of the object that we're calling "ship" on this pass of the function (as defined above), indexOf will set the new variable "index" to that corresponding position number

			if (index >= 0) { //... but if the guesss DOESN'T match a value at any of those locations, indexOF will be -1 by default, so this line will FAIL the conditional test that adds "hit"
				ship.hits[index] = "hit"; // adds a hit to the corresponding index spot of the "hits" array of whatever ship we're in 
				view.displayHit(guess); // and FURTHERMORE - if that test succeeeds, call the displayHit method of the view object, with that valid "guess" value passed in as the argument for the location parameter
				view.displayMessage("HIT!");
				if (this.isSunk(ship)) { // feed the current value of ship into the isSunk function, which will return TRUE or FALSE
					this.shipsSunk++; //then, if isSunk returns true, add 1 to the value of shipsSunk
				}
				return true;
			}

			/* 
			This is how you could achieve this same action w/ another iterating FOR loop - 
			for (i = 0; i < locations.length; i++) { 
				if (guess == locations[i]) {
					ship.hits[i] = "hit";
					return true;
				}
			*/	
		}

			view.displayMiss(guess); //if all the ships have been inspected via the first "for" loop and no hit is made, which would return true and end the loop, then call this method and pass it the value of the unsuccessful "guess"
			view.displayMessage("Ya missed");
			return false; 
	},

	isSunk: function(ship) { //this method is called in the fire function, at a point where "ship" has been defined, that's what gets passed into this function 
		for (var i = 0; i < this.shipLength; i++) { //for as long as 'i' is less than the value of shipLength, adding 1 every time the loop executes...
			if (ship.hits[i] !== "hit") { //...look at the index position of whatever 'i' is in the "hits" array of whatever ship object has been set/we're looking at, and if the value at that location is not "hit"...
				return false; //...return false
			}
		}
		return true; // or, ya know, return true, cause... its true
	}
}; // end model object

var controller = { //begin controller object
	
	guesses: 0,

	processGuess: function(guess) { // end result possibilities of processGuess -> a) NOTHING happens - parseGuess catches the fuckup entry and is like "thats not legit" OR b) the guesses count in the model gets updated, hit is true or false
		var location = parseGuess(guess); //this will call the parseGuess function; if any of the conditions set up in parseGuess fail, guess will return as NULL for the arugment here, so the next block won't run
		if (location) {  //if a location is true (aka not null, as established above) we'll run the following
				this.guesses++; 
				var hit = model.fire(location); //take the recently defined "location" value (produced by parseGuess to get it in the right format) as the argument for the model's FIRE method, and the result of that - which will be TRUE or FALSE -  is now called "hit" 
				if (hit && model.shipsSunk === model.numShips) {
					view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
				} //if hit is true and shipsSunk's value is now equal to the number of ships total, as designated in numShips, change 
		}
	},
	
//end processGuesses method 

}; //end controller

//"Helper" functions (outside scope of View, Model and Controller objects)

parseGuess = function(guess) { //will take user input, make sure it's valid, and convert it into readble form for the processGuess function to handle
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) { // first valididty check tests whether guess is 2 characters BUT why do we need to check for null?? 
		alert("Oops, please enter a letter and a number on the board."); 
	} else { //end first validity test; open statement to grab first character from guess - EVERYTHING IN THIS ELSE STATEMENT is related to the guess being 2 characters 
		var firstChar = guess.charAt(0); //looks at guess, which should be a string w/ 2 characters, and makes a variable called firstChar equal to the first character of that 2-character string
		var row = alphabet.indexOf(firstChar); // looks up the index position of firstChar in the alphabet array, and sets that value to "row", which will now be a number (0-6) that corresponds to the alpha character; if the charAt(index position) doesn't match a value in the alphabet array (for instance, if its K or *) row will be set as -1
		var column = guess.charAt(1); //grabs second character in the guess and assigns it to a variable called column

		if (isNaN(row) || isNaN(column) ) { //makes sure both characters are numbers
			alert("That's not on the board yo");
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) { //makes sure row and column fall between 0 - 6. instead of hardcoding the length, we set it to the value of the boardSize property 
			alert("Hey that's ALSO not on the board buddy");
		} else {
			return row + column; //guess passed all the checks - since this is a return statement, if that happens, the function will cease execution here so we won't get to the default 'null' return statement beflow 
		} 
	} // ends the 'else' at line 80 for everything being 2 characters
	return null;//if any of the falsehood setups above get executed, we won't get that succesful return of row + column, so this default statement of returning null will execute
	} //end parseGuess method


function handleFireButton() { //defines a function that's assigned to the "onclick" property of fireButton.... sooo, based on the as yet uncomprehended magic of onclick, i guess that means somehow, it gets executed whenever what we call the FIREBUTTON is clicked. i dont fucking get it. but i think this is what the kids call an "even handler"
	var guessInput = document.getElementById("guessInput"); //once again, following this convention -> get an ELEMENT in the DOM and assign it an object refernce variable of the same name for JS use
	var guess = guessInput.value; //find whatever's in the "value" property of "guessInput" and name it as a var called "guess"
	controller.processGuess(guess) //call the controller's processGuess method with the value of "guess" as its argument 
}


function handleKeyPress (myEvent) { //define a function called handlekeypress with a parameter called myEvent
	var fireButton = document.getElementById("fireButton"); //look up an element in the document with the ID "fireButton" and assign it to a var of the same name
	if (myEvent.keyCode === 13) { //if the "keycode" of property of the "myEvent" parameter passed into this function is equal to 13... (meaning, myEvent is an object of some kind, since it's got a property. it aint no dang primitive THATSAFORSURE)
		fireButton.click();
		return false;
	}
}

function init() { //this function exists to be loaded only when the page (DOM) is loaded - so HTML references are actually THERE when we go hunting for them. even if other functions use getelementbyid (namely the handleFireButton() event caller), and would return null on their own, they aren't NEEDED until called by THIS function, so the HTML will actually all be in place when it matters
	var fireButton = document.getElementById("fireButton"); //look up an element in the document object w the ID FIREBUTTON and assign it to a var of the same name
	fireButton.onclick = handleFireButton; //assign something called "handleFireButton" (PROTIP  - it's a function, defined below) to the onclick property of the var we're calling fireButton -
	var guessInput = document.getElementById("guessInput"); // look up an element in the document object w the ID "guesInput" and assign it a var reference of the same name
	guessInput.onkeypress = handleKeyPress; //assign a var called handlekeypress to the onkeypress property of the object we're calling guessInput

	model.generateShipLocations(); //calls generateShip as soon as the window loads!!!
}

window.onload = init; 




