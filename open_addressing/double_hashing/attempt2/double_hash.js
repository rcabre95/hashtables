// forgot that in hashtables you're dealing with undefined, not null;

class HashTable {
	constructor() {
		this.table = [];
		this.mod = 71;
		this.numItems = 0;
		this.min = 71;
	}

	hashTwo(key) {
		return key.length % this.mod;
	}

	modularHash(key) {
		let sum = 0;
		for (let i = 0; i < key.length; i++) {
			sum += key.charCodeAt(i); // forgot that charCodeAt() is method
		}

		let hash = sum % this.mod;
		return hash;
	}

	insert(key, value) {
        console.log("entered insert")
		let attemptNum = 0;
		let hashOne = this.modularHash(key); // forgot this
		let hashTwo = this.hashTwo(key);     // forgot this
		let hash = hashOne + attemptNum * hashTwo;

		if (this.table[hash] !== undefined) {
            console.log("entered if statement")
			while (this.table[hash] !== undefined) {
                console.log("entered while loop");
                if (this.table[hash] !== "deleted" && this.table[hash][0] === key) {
                    console.log("Key already in use!")
                    return "Key already in use!"
                }
				attemptNum += 1;
			}
            console.log("exited while loop")
		} 
		
		this.numItems += 1;
		this.table[hash] = [key, value];
		if (this.numItems / this.mod > 0.5) {
			this.mod = this.mod * 2;
			this.resize();
		}
	}

	

    remove(key) {
		let attemptNum = 0;
		let hashOne = this.modularHash(key); // forgot this
		let hashTwo = this.hashTwo(key);     // forgot this
		let hash = hashOne + attemptNum * hashTwo;

		if (this.table[hash] === undefined) {
			return "not found"
		} else {
			while (this.table[hash] !== undefined) {
				if (this.table[hash] === "deleted") {
					attemptNum += 1;
				} else {
					if (this.table[hash][0] !== key) {
						attemptNum += 1;
					} else {
						this.table[hash] = "deleted";
						this.numItems -= 1;
						break;
					}
				}
			}
		}

		if (this.numItems / this.mod < 0.25 && this.mod / 2 > this.min) {
			this.resize();
		}
	}

	get(key) {
		let attemptNum = 0;
		let hashOne = this.modularHash(key); // forgot this
		let hashTwo = this.hashTwo(key);     // forgot this
		let hash = hashOne + attemptNum * hashTwo;

		if (this.table[hash] !== undefined) {
			while (this.table[hash] !== undefined) {
				if (this.table[hash] === "deleted" || this.table[hash][0] !== key) {
					attemptNum += 1;
				} else {
					return this.table[hash][1]
				}
			}
		} else {
			return null;
		}
	}

	resize() {
		if (this.numItems / this.mod > 0.5) {
			this.mod *=2
		} else {
			this.mod /= 2
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

console.log(someHash)
console.log(someHash.get("rcabre95"))
someHash.remove("rcabre95")
console.log(someHash)