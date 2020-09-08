class ASNodeArraySet {
	constructor() {
		this.content = [];
	}

	bestGuessBinarySearch(item, startIndex=null, endIndex=null) {
		startIndex = startIndex == null ? 0 : startIndex;
		endIndex = endIndex == null ? this.content.length : endIndex;

		if(startIndex == endIndex) return startIndex;

		let check = Math.floor((startIndex + endIndex) / 2);

		if   (this.content[check].fCost > item.fCost)   return this.bestGuessBinarySearch(item, startIndex, check);
		else if(this.content[check].fCost < item.fCost) return this.bestGuessBinarySearch(item, check + 1, endIndex);
		else return check;
	}

	add(item) {
		let index = this.bestGuessBinarySearch(item);
		
		if(index == this.content.length) this.content.push(item);

		else if(this.content[index] != item)
				if(index == 0 || this.content[index].fCost > item.fCost)	this.content.splice(index, 0, item);
				else														this.content.splice(index + 1, 0, item);
	}

	popFirst() {
		let item = this.content[0];
		this.content.splice(0, 1);
		return item;
	}

	get length() {
		return this.content.length;
	}


}