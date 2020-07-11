var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class","hit");
	},
	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
		}
};

var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,

	ships: //all 3 ships are values in the "ships" array, as in ships[x] - each individual ship entry is AN OBJECT ITSELF containing its own arrays as properties 

		[ { locations: ["06", "16", "26"], hits: ["", "", ""] }, //first ship
		  { locations: ["24", "34", "44"], hits: ["", "", ""] }, //second ship
		  { locations: ["10", "11", "12"], hits: ["", "", ""] }  //third ship
		],
	fire: function(guess) { //method to accept a guess value and iteratively compare it to values in the ship "locations" arrays

		for (var i = 0; i < this.numShips; i++) { 
			var ship = this.ships[i];
			var locations = ship.locations;
			var index = locations.indexOf(guess); 
			if (index >= 0) {
				ship.hits[index] = "hit";
			}
		}
	}

};

model.fire("06");
view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");

view.displayMessage("Tap tap bish");