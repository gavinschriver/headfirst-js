		
function bark (dogName, dogWeight) {
	if (dogWeight > 20) {
		console.log (dogName + " says WOOFWOOF");
	} else {
		console.log (dogName + " says wooooof");
	}
}

bark("Rover", 23);
bark("spot", 13);
bark("lady", 17);

function doIt(param) {
	param = 2;
}

var test = 1;
doIt(test);

console.log(test);

function bake(degrees) {
	var message;

if (degrees > 500) {
	message = "Im not a dang nuclear reactor!!!!";
} else if (degrees < 100) {
	message = "i aint no fridge neither";
} else {
	message = "thassaverynice.";
	}
return message;
}

var status = bake(350);

console.log(status);

function calculateArea (r) {
	var area; 
	if (r <= 0) {
		return 0;
	} else {
		area = Math.PI * r * r;
		return area;
	}
}

var radius = prompt("Please enter a value for this shit");
var theArea = calculateArea(radius);
console.log("The area is: " + theArea);