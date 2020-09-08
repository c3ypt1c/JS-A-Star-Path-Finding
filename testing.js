function getRandomInt(max) { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	return Math.floor(Math.random() * Math.floor(max)) + 1;
}

let endNode = new ASNode(0, 0, null);

let activeArrSet;
//testing random
for (var i = 0; i < 5; i++) {
	activeArrSet = new ASNodeArraySet();
	console.log(activeArrSet);
	console.log("\nadding: ");
	for (var i = 0; i < 50; i++) {
		let node = new ASNode(getRandomInt(100), getRandomInt(100), null);
		console.log(node.fCost);
		activeArrSet.add(node);
	}

	console.log("activeArrSet.fCost: ");
	for (var i = 0; i < activeArrSet.content.length; i++) {
		console.log(activeArrSet.content[i].fCost);
	}

	console.log("mixing: ");
	for (var i = 0; i < getRandomInt(10); i++) {
		let randint = getRandomInt(activeArrSet.content.length);
		console.log("adding again: " + randint + "(" + activeArrSet.content[randint].fCost + ")");
		activeArrSet.add(activeArrSet.content[randint]);
	}

	console.log("activeArrSet.fCost (b): ");
	for (var i = 0; i < activeArrSet.content.length; i++) {
		console.log(activeArrSet.content[i].fCost);
	}
}




endNode = undefined;