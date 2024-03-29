import * as diagnostic from '../../../diagnostics/diagnostics.js';

type DoubleString = [string, string] | "deleted" | undefined

class MyHashTable {
    private table: DoubleString[];
    public mod: number;
    private numItems: number;
    private min: number;
    constructor() {
        this.table = [];
        this.mod = 601;
        this.numItems = 0;
        this.min = 29;
    }

    modularHash(key: string) {
        let sum: number = 0;

        for (let j = 0; j < key.length; j++) {
            sum += key.charCodeAt(j);
        };
        let hash: number = sum % this.mod;

        return hash;
    }

    resize(direction: number) {
        this.mod = direction == 1 ? this.mod * 2 : this.mod / 2;
        let oldTable: DoubleString[] = this.table;
        let newTable: DoubleString[] = [];
        
        for (let i = 0; i < oldTable.length; i++) {
            if (oldTable[i] === undefined || oldTable[i] === "deleted") {
                continue;
            } else {
                let hash: number = this.modularHash(oldTable[i][0]);

                if (newTable[hash] === undefined) {
                    return newTable[hash] = oldTable[i]
                } else {
                    while (newTable[hash] !== undefined) {
                        hash++;
                    }
                }
            }
        }

        return this.table = newTable;
    }

    put(key: string, value: string) {
        let hash: number = this.modularHash(key);
        
        if (this.table[hash] === undefined) {
            this.numItems++
            return this.table[hash] = [key, value];
        } else {
            while (this.table[hash] !== undefined) {
                hash++;
            }
        }

        if (this.numItems/this.mod > 0.5) {
            console.log("resize up")
            this.resize(1);
        }

        return this.table[hash] = [key, value]
    }

    get(key: string) {
        let hash: number = this.modularHash(key);

        while (this.table[hash] !== undefined) {
            if (this.table[hash] === "deleted") {
                hash++
            } else if (this.table[hash][0] !== key) {
                hash++
            } else {
                return this.table[hash][1]
            }
        }

        return undefined;
    }

    remove(key: string) {
        let hash: number = this.modularHash(key);

        while (this.table[hash] !== undefined) {
            if (this.table[hash] === "deleted") {
                hash++;
            } else if (this.table[hash][0] !== key) {
                hash++;
            } else {
                this.numItems--;
                this.table[hash] = "deleted"
            }
        }

        if (this.numItems/this.mod < 0.25 && this.mod > this.min * 2) {
            console.log("resize down")
            this.resize(0);
        }

        return undefined;
    }
}

const myHashTable = new MyHashTable;

console.log(myHashTable);

// function addData(numIts: number, direction: string, source: any[]) {
//     if (numIts > source.length) {
//         console.log("numIts must be smaller than the source length");
//         return "numIts must be smaller than the source length";
//     };

//     switch(direction) {
//         case "up": {
//             for (let i = 0; i < numIts; i++) {
//                 myHashTable.put(source[i], `@${source[i]}`)
//             }
//         };
//         break;

//         case "down": {
//             for (let i = source.length - 1;
//                 i > source.length-1-numIts;
//                 i--) {
//                 myHashTable.put(source[i], `@${source[i]}`)
//             }
//         };
//         break;

//         default: {
//             for (let i = 0; i < source.length -1; i++) {
//                 myHashTable.put(source[i], `@${source[i]}`)
//             }
//         }
//     }

//     return undefined;
// }

// function removeData(
//     startingNum: number,
//     source: any[] = jsonData,
//     amntToRem: number,
//     ) {
//     if (amntToRem > 1 || amntToRem < 0) {
//         console.log("amntToRem must be between 0 and 1");
//         return "amntToRem must be between 0 and 1"
//     };

//     addData(startingNum, "up", source);
//     for (let i = 0; i < startingNum*amntToRem; i++) {
//         myHashTable.remove(source[i])
//     }
// }

// function addDuplicates(key: string, value: string, numIts: number) {
//     for (let i = 0; i < numIts; i++) {
//         myHashTable.put(key, value)
//     }
// }

// addDuplicates("Raphael Cabrera", '@raphaelcabrera', 100);

// addData(100, "down", jsonData);
diagnostic.removeData(1000, 0.9);

console.log(myHashTable)