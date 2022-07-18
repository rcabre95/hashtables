var require: any;
const jsonData = require('../../../data/first_names.json');

console.log("----- Results -----\n-------------------\n");

type DoubleString = [string, string] | "deleted" | undefined

class DoubleHashTable {
    public table: DoubleString[];
    public mod: number;
    private min: number;
    private numItems: number;
    constructor() {
        this.table = [];
        this.mod = 71;
        this.numItems = 0;
        this.min = 29;
    }

    modularHash2(key: string) {
        let hash2: number = Math.abs(key.charCodeAt(key.length - 1) + key.charCodeAt(0) - key.length);
        return hash2
    }

    modularHash1(key: string, attempt: number) {
        let sum: number = 0;

        for (let k: number = 0; k < key.length; k++) {
            sum += key.charCodeAt(k);
        }

        let hash2 = this.modularHash2(key)
        let hash: number = (sum + attempt*hash2) % this.mod;
        return hash;
    }

    

    private resize(direction: number) {
        this.mod = direction == 1 ? this.mod * 2 : this.mod / 2;
        let oldTable: DoubleString[] = this.table;
        let newTable: DoubleString[] = [];

        for  (let i = 0; i < oldTable.length; i++) {
            if (oldTable[i] === undefined) {
                continue;
            } else if (oldTable[i] === "deleted") {
                continue;
            } else {
                for (let a = 0; a < this.numItems; a++) {
                    if (newTable[this.modularHash1(oldTable[i][0], a)] === undefined) {
                        return newTable[this.modularHash1(oldTable[i][0], a)] = oldTable[i]
                    } else {
                        continue;
                    }
                }
            }
        }

        return this.table = newTable;
    }

    put(key: string, value: string) {
        let attemptNum: number = 0;
        this.numItems++

        if (this.table[this.modularHash1(key, attemptNum)] === undefined) {
            return this.table[this.modularHash1(key, attemptNum)] = [key, value]
        } else {
            while (this.table[this.modularHash1(key, attemptNum)] !== undefined) {
                attemptNum++
            }
        }

        if (this.numItems/this.mod > 0.5) {
            this.resize(1);
        }

        return this.table[this.modularHash1(key, attemptNum)] = [key, value]
    }

    remove(key: string) {
        //somethings wrong with removals. fix it.
        for (let i = 0; i < this.numItems; i++) {
            if (this.table[this.modularHash1(key, i)] === undefined) {
                continue;
            } else if (this.table[this.modularHash1(key, i)] === "deleted") {
                continue;
            } else if (this.table[this.modularHash1(key, i)][0] !== key) {
                continue;
            } else {
                this.numItems--
                console.log(`${key} has been successfully deleted.`)
                this.table[this.modularHash1(key, i)] = "deleted";
                break;
            }
        }

        if (this.numItems/this.mod < 0.25 && this.mod > this.min*2) {
            this.resize(0);
        }

        console.log(`${key} could not be deleted.`)
        return undefined
    }

    get(key: string) {
        // theory: if the key exists or ever existed in the hashtable, then .get should never return undefined. test by removing undefined conditional clause.
        for (let i = 0; i < this.numItems; i++) {
            if (this.table[this.modularHash1(key, i)] === undefined) {
                continue;
            } else if (this.table[this.modularHash1(key, i)] === "deleted") {
                continue;
            } else if (this.table[this.modularHash1(key, i)][0] !== key) {
                continue;
            } else {
                return this.table[this.modularHash1(key, i)][1]
            }
        }

        return undefined
    }
}

const doubleHash = new DoubleHashTable();
console.log("-------Hash Created------\n")
console.log(doubleHash);
console.log("-------------------------\n")

function addData(numIts, direction, source) {
console.log("----------AddData--------\n")

    if (numIts > source.length) {
        console.log("numIts must be smaller than the source length");
        return "numIts must be smaller than the source length";
    };

    switch(direction) {
        case "up": {
            for (let i = 0; i < numIts; i++) {
                doubleHash.put(source[i], `@${source[i]}`)
            }
        };
        break;

        case "down": {
            for (let i = source.length - 1;
                i > source.length-1-numIts;
                i--) {
                doubleHash.put(source[i], `@${source[i]}`)
            }
        };
        break;

        default: {
            for (let i = 0; i < source.length -1; i++) {
                doubleHash.put(source[i], `@${source[i]}`)
            }
        }
    }
    console.log(doubleHash.mod)

    return undefined;
}

function removeData(
    startingNum,
    source = jsonData,
    amntToRem
    ) {
    if (amntToRem > 1 || amntToRem < 0) {
        console.log("amntToRem must be between 0 and 1");
        return "amntToRem must be between 0 and 1"
    };
    
    addData(startingNum, "up", source);
    console.log("--------RemoveData-------\n")
    for (let i = 0; i < Math.abs(startingNum*amntToRem); i++) {
        doubleHash.remove(source[i])
    }
    console.log(doubleHash.mod)

}

function addDuplicates(key, value, numIts) {
console.log("------AddDuplicates------\n")

    for (let i = 0; i < numIts; i++) {
        doubleHash.put(key, value)
    }
}

// addData(10, 'up', jsonData);
removeData(100, jsonData, 0.7);
console.log(doubleHash);