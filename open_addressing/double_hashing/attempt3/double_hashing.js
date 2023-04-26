class HashTable {
	constructor() {
		this.table = [];
		this.mod = 71;
		this.min = 71;
		this.numItems = 0;
	}

	modHashOne(key) {
		let sum = 0;
		for (let i = 0; i < key.length; i++) {
			sum += key.charCodeAt(i);
		}
		let hash = sum % this.mod;

		return hash
	}

	modHashTwo(key) {
		return key.length % this.mod;
	}

	insert(key, value) {
		let attemptNum = 0;
		let hashOne = this.modHashOne(key);
		let hashTwo = this.modHashTwo(key);
		let hash = hashOne + attemptNum * hashTwo;

		if (this.table[hash] !== undefined) {
			while (this.table[hash] !== undefined) {
				if (this.table[hash][0] === key) {
					return null;	
				}
				attemptNum += 1;
			}
		}

		this.table[hash] = [key, value];
		this.numItems += 1;

		if (this.numItems / this.mod > 0.5) {
			this.resize();
		}
	}

	get(key) {
		let attemptNum = 0;
		let hashOne = this.modHashOne(key);
		let hashTwo = this.modHashTwo(key);
		let hash = hashOne + attemptNum * hashTwo;

		if (this.table[hash] === undefined) {
			return "not found"
		} else {
			while (this.table[hash] !== undefined) {
				if (this.table[hash] === "deleted" || this.table[hash][0] !== key) {
					attemptNum += 1;
				} else {
					return this.table[hash][1]
				}
			}
		}
		
		return "not found"
	}

	remove(key) {
		let attemptNum = 0;
		let hashOne = this.modHashOne(key);
		let hashTwo = this.modHashTwo(key);
		let hash = hashOne + attemptNum * hashTwo;

		if (this.table[hash] !== undefined) {
			while (this.table[hash] !== undefined) {
				if (this.table[hash] === "deleted" || this.table[hash][0] !== key) {
					attemptNum += 1;
				} else {
					this.table[hash] = "deleted";
					this.numItems -= 1;
				}
			}
		} else {
			return null;
		}

		if (this.numItems / this.mod < 0.2 && this.mod / 2 >= this.min) {
			this.resize()	
		}
}

	



resize() {
		if (this.numItems / this.mod > 0.5) {
			this.mod *= 2;	
		} else {
			this.mod /= 2;
		}

		let oldTable = this.table;
		this.table = [];

		for (let i = 0; i < oldTable.length; i++) {
			if (oldTable[i] === undefined || oldTable[i] === "deleted") {
				continue;
			} else {
				this.insert(oldTable[i][0], oldTable[i][1])
			}
		}
}
}

const someHash = new HashTable();
someHash.insert("rcabre95", { firstName: "Raphael", lastName: "Cabrera" });
someHash.insert("rcabre95", { firstName: "Raphael", lastName: "Cabrera" });

console.log(someHash)
console.log(someHash.get("rcabre95"))
someHash.remove("rcabre95")
console.log(someHash)