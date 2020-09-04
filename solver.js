function $(id) {
	return document.getElementById(id);
}

function showError() {
	$("failed").classList.remove("hidden");
	setTimeout(hideError, 1500);
}

function hideError() {
	$("failed").classList.add("hidden");
}

function showSolved() {
	$("solved").classList.remove("hidden");
	setTimeout(hideSolved, 1500);
}

function hideSolved() {
	$("solved").classList.add("hidden");
}

let state = 0;

function flip(node) {
	switch(state) {
		case 0:
		state--;
		break;

		case 1:
		node.htmlDOMObject.classList.add("start");
		startNode = node;
		break;

		case 2:
		node.htmlDOMObject.classList.add("end");
		endNode = node;
		break;

		default:
		node.htmlDOMObject.classList.toggle("wall");
		node.toggleWall();
	}
	state++;
}

function init() {
	$("createGrid").addEventListener("click", createTable);
	$("solve").addEventListener("click", startSolver);
	$("reset").addEventListener("click", reset);
}

let rows;
let cols;

function createTable() {
	reset();
	rows = $("height").value;
	cols = $("width").value;

	let table = $("table");
	for (var row = 0; row < rows; row++) {
		
		grid[row] = [];

		for (var col = 0; col < cols; col++) {
			let tc = document.createElement("div");
			let tempNode = grid[row][col] = new ASNode(row, col, tc);

			
			tc.classList.add("tableTc");
			tc.classList.add("cell");
			tc.addEventListener("click", function() {flip(tempNode);} );

			let animObj = document.createElement("div");
			animObj.classList.add("animObj");
			tc.appendChild(animObj);

			table.appendChild(tc);
		}
	}

	$("table").style = "grid-template-columns: repeat("+ cols + ",1fr);";

	$("tableWrapper").classList.add("loadedTable");

	state = 1;
}
let grid = [];
let startNode;
let endNode;

class ASNode {
	constructor(row, col, htmlDOMObject) {
		this.locked = false;
		this.active = false;
		this.wall = false;
		
		this.htmlDOMObject = htmlDOMObject;
		this.row = row;
		this.col = col;

		this.hCost = null; //distance to end;
		this.gCost = null; //distance from start
		this.origin = null;		
	}

	get fCost () {
		if(this.hCost == null) this.hCost = this.distanceTo(endNode);
		return this.gCost + this.hCost;
	}

	update(origin) {
		if(!this.locked && !this.wall && (this.gCost == null || origin.gCost + this.distanceTo(origin) < this.gCost) ) {
			this.gCost = origin.gCost + this.distanceTo(origin);
			this.origin = origin;
		} 
	}

	toggleWall() {
		this.wall = !this.wall;
	}

	distanceTo(node) {
		return Math.hypot(node.row - this.row, node.col - this.col);
	}
}

function startSolver() {
	if(state < 2) return;
	startNode.active = true;
	startNode.locked = true;
	startNode.gCost = 0;

	let activeNodes = [startNode];

	while (activeNodes.length > 0) {
		//debugger;
		activeNodes.sort(function(a, b) {
			return a.fCost - b.fCost;
		});

		let currentNode = activeNodes[0];
		activeNodes.splice(0, 1);
		currentNode.locked = true;

		console.log("Looking at:");
		console.log(currentNode);

		if(currentNode == endNode) break;

		let row = currentNode.row;
		let col = currentNode.col

		let rowPositive = row + 1 < rows;
		let rowNegative = row > 0;
		let colPositive = col + 1 < cols;
		let colNegative = col > 0;

		console.log([rowPositive, rowNegative, colPositive, colNegative]);
		let toUpdate = [];

		if(rowPositive) {
			toUpdate.push(grid[row + 1][col]);

			if(colNegative) toUpdate.push(grid[row + 1][col - 1]);
			if(colPositive) toUpdate.push(grid[row + 1][col + 1]);
		}

		if(rowNegative) {
			toUpdate.push(grid[row - 1][col]);

			if(colNegative) toUpdate.push(grid[row - 1][col - 1]);
			if(colPositive) toUpdate.push(grid[row - 1][col + 1]);
		}

		if(colNegative) toUpdate.push(grid[row][col - 1]);
		if(colPositive) toUpdate.push(grid[row][col + 1]);

		for (var i = toUpdate.length - 1; i >= 0; i--) {
			if(!toUpdate[i].active) toUpdate[i].active = true;
			if(!(toUpdate[i].locked || toUpdate[i].wall))  {
				toUpdate[i].update(currentNode);
				activeNodes.push(toUpdate[i]);
			}
		}
	}

	if(endNode.origin != null) {
		console.log("in path:");
		let backNode = endNode.origin;
		while(true) {
			if(backNode == startNode) break;
			console.log(backNode);
			backNode.htmlDOMObject.classList.add("path");
			backNode = backNode.origin;
		}
	}

}

function reset() {
	let table = $("table");
	table.textContent = "";
	init();
	state = 1;
}
