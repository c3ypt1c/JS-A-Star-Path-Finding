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
		case 0:
		state--;
		break;

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
	$("createGrid").addEventListener("click", createTable);
	$("solve").addEventListener("click", startSolver);
	$("reset").addEventListener("click", reset);
}

function createTable() {
	reset();
	let rows = $("height").value;
	let cols = $("width").value;

	let table = $("table");
	for (var row = 0; row < rows; row++) {

		for (var col = 0; col < cols; col++) {
			let tc = document.createElement("div");
			tc.classList.add("tableTc");
			tc.classList.add("cell");
			tc.addEventListener("click", function() {flip(tc);} );

			let animObj = document.createElement("div");
			animObj.classList.add("animObj");
			tc.appendChild(animObj);

			table.appendChild(tc);
		}
	}

	$("table").style = "grid-template-columns: repeat("+ cols + ",1fr);";

	$("tableWrapper").classList.add("loadedTable");
}


function startSolver() {

}

function reset() {
	let table = $("table");
	table.textContent = "";
	init();
	state = 1;
}