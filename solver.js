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

Array.prototype.in = function(item) {
	return this.indexOf(item) != -1;
}

let state = 1;

function flip(obj) {
	switch(state) {
		case 1:
		obj.classList.add("start");
		//note down where
		break;

		case 2:
		obj.classList.add("end");
		//note down where
		break;

		default:
		obj.classList.toggle("wall");
	}
	state++;
}

function init() {
	initGrid();
}

function initGrid() {
	let table = $("table");
	for (var row = 0; row < 9; row++) {
		let tr = document.createElement("div");
		tr.classList.add("tableTr");

		for (var col = 0; col < 9; col++) {
			let tc = document.createElement("div");
			tc.classList.add("tableTc");
			tc.classList.add("cell");
			tc.addEventListener("click", function() {flip(tc);} );
			tr.appendChild(tc);
		}

		table.appendChild(tr);
	}

	$("solve").addEventListener("click", startSolver);
	$("reset").addEventListener("click", reset);
	$("tableWrapper").classList.add("loadedTable");
}


function startSolver() {

}

function reset() {
	let table = $("table");
	table.textContent = "";
	init();
}