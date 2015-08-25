
var SchemaModel = function() {
	this.flushPoints = [];
};

SchemaModel.prototype.getRootType = function() {
	return typeNameDictionary[0];
};

SchemaModel.prototype.getTypes = function() {
	return typeNameDictionary;
};

SchemaModel.prototype.getProperties = function(type) {
	return propertyNameDictionary;
};

SchemaModel.prototype.getFlushPoints = function() {
	return this.flushPoints;
};

SchemaModel.prototype.isFlushPoint = function(flushPoint) {
	for ( var i = 0; i < this.flushPoints.length; i++ ) {
		if ( this.flushPoints[i] == flushPoint )
			return true;
	}
	return false;
};

SchemaModel.prototype.createFlushPoint = function(flushPoint) {
	for ( var i = 0; i < this.flushPoints.length; i++ ) {
		if ( this.flushPoints[i] == flushPoint )
			return;
	}
	this.flushPoints.push(flushPoint);
};

SchemaModel.prototype.removeFlushPoint = function(flushPoint) {
	for ( var i = 0; i < this.flushPoints.length; i++ ) {
		if ( this.flushPoints[i] == flushPoint )
			this.flushPoints.splice(i, 1);
	}
};

				var typeNameDictionary = [
					"Max", "Maggie",
					"Jake", "Molly",
					"Buddy", "Lady",
					"Bailey", "Sadie",
					"Sam", "Lucy",
					"Rocky", "Daisy",
					"Buster", "Ginger",
					"Casey", "Abby",
					"Cody", "Sasha",
					"Duke", "Sandy",
					"Charlie", "Dakota",
					"Jack", "Katie",
					"Harley", "Annie",
					"Rusty", "Chelsea",
					"Toby", "Princess",
					"Murphy", "Missy",
					"Shelby", "Sophie",
					"Sparky", "Bo",
					"Barney", "Coco",
					"Winston", "Tasha"
				];
				var propertyNameDictionary = [
					"Jacob", "Emily",
					"Michael", "Madison",
					"Joshua", "Hannah",
					"Matthew", "Emma",
					"Ethan", "Alexis",
					"Joseph", "Ashley",
					"Andrew", "Abigail",
					"Christopher", "Sarah",
					"Daniel", "Samantha",
					"Nicholas", "Olivia",
					"William", "Elizabeth",
					"Anthony", "Alyssa",
					"David", "Lauren",
					"Tyler", "Isabella",
					"Alexander", "Grace",
					"Ryan", "Jessica",
					"John", "Brianna",
					"James", "Taylor",
					"Zachary", "Kayla",
					"Brandon", "Anna",
					"Jonathan", "Victoria",
					"Justin", "Megan",
					"Christian", "Sydney",
					"Dylan", "Chloe",
					"Samuel", "Rachel",
					"Austin", "Jasmine",
					"Jose", "Sophia",
					"Benjamin", "Jennifer",
					"Nathan", "Morgan",
					"Logan", "Natalie",
					"Kevin", "Julia",
					"Gabriel", "Kaitlyn",
					"Robert", "Hailey",
					"Noah", "Destiny",
					"Caleb", "Haley",
					"Thomas", "Katherine",
					"Jordan", "Nicole",
					"Hunter", "Alexandra",
					"Cameron", "Maria",
					"Kyle", "Savannah",
					"Elijah", "Stephanie",
					"Jason", "Mia",
					"Jack", "Mackenzie",
					"Aaron", "Allison",
					"Isaiah", "Amanda",
					"Angel", "Jordan",
					"Luke", "Jenna",
					"Connor", "Faith",
					"Luis", "Paige",
					"Isaac", "Makayla",
					"Brian", "Andrea",
					"Juan", "Mary",
					"Jackson", "Brooke",
					"Eric", "Katelyn",
					"Mason", "Rebecca",
					"Adam", "Madeline",
					"Evan", "Michelle",
					"Carlos", "Kaylee",
					"Charles", "Sara",
					"Sean", "Kimberly",
					"Gavin", "Zoe",
					"Alex", "Kylie",
					"Aidan", "Aaliyah",
					"Bryan", "Sierra",
					"Nathaniel", "Amber",
					"Jesus", "Caroline",
					"Ian", "Gabrielle",
					"Steven", "Vanessa",
					"Cole", "Alexa",
					"Timothy", "Trinity",
					"Cody", "Danielle",
					"Adrian", "Erin",
					"Seth", "Autumn",
					"Sebastian", "Angelina",
					"Devin", "Shelby",
					"Lucas", "Gabriella",
					"Richard", "Riley",
					"Blake", "Jada",
					"Julian", "Lily",
					"Patrick", "Melissa",
					"Trevor", "Jacqueline",
					"Jared", "Angela",
					"Miguel", "Ava",
					"Chase", "Isabel",
					"Dominic", "Bailey",
					"Antonio", "Ariana",
					"Xavier", "Jade",
					"Jeremiah", "Melanie",
					"Jaden", "Courtney",
					"Alejandro", "Leah",
					"Jeremy", "Maya",
					"Jesse", "Ella",
					"Garrett", "Jocelyn",
					"Diego", "Leslie",
					"Mark", "Claire",
					"Owen", "Christina",
					"Hayden", "Lillian",
					"Victor", "Evelyn",
					"Bryce", "Gabriela",
					"Riley", "Catherine"
				];