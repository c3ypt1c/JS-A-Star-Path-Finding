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

	get fCost() {
		if(this.hCost == null) this.hCost = this.distanceTo(endNode);
		return this.gCost + this.hCost;
	}

	update(origin) {
		if(!this.locked && !this.wall && (this.gCost == null || origin.gCost + this.distanceTo(origin) < this.gCost) ) {
			this.gCost = origin.gCost + this.distanceTo(origin);
			this.origin = origin;
			return true;
		} 
		return false;
	}

	toggleWall() {
		this.wall = !this.wall;
	}

	distanceTo(node) {
		return Math.hypot(node.row - this.row, node.col - this.col);
	}
}