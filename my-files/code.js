var word = "bottles";
			var count = 99
			while (count > 1) {
				console.log (count + " " + word + " of beer on the wall");
				console.log(count + " " + word + " of beer,");
				console.log ("take one down, pass it around");
				count = count - 1;
				if (count > 1) {
				console.log (count + " " + word + " of beer");
				}	else if (count == 1) {
					console.log (count + "bottle of beer on the wall");
					console.log(count + " bottle of beer,");
					console.log ("take it down, pass it around");
					count = count - 1;
					console.log ("no more" + " " + word + " of beer");
				}
			}