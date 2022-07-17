console.log("----- Results -----\n-------------------\n");

type StringDouble = [string, string] | "deleted"

class SomeHashTable {
    public table: any[];
    public mod: number;
    private numItems: number;
    private min: number;

    constructor() {
        this.table = []
        this.mod = 41
        this.numItems = 0
        this.min = 29
    }

    modularHash(key: string, attempt: number) {
        let sum: number = 0;
        for (let i: number = 0; i < key.length; ++i) {
            sum += key.charCodeAt(i)
        };

        let hash: number = (sum + attempt**2) % this.mod;

        if (isNaN(hash)) {
            
            console.log(key, attempt, sum, this.mod)
            console.trace()
        }

        return hash
    }

    private resize(direction: number) {
        console.log(`risizing ${direction == 1 ? "up." : "down."}`);
        const oldTable: StringDouble[] = this.table;
        let newTable: StringDouble[] = [];
        this.mod = direction == 1 ? this.mod * 2 : Math.ceil(this.mod / 2);

        for (let i: number = 0; i < oldTable.length; i++) {
            if (oldTable[i] === undefined) {
                console.log("undefined")
                continue;
            } else if (oldTable[i] === "deleted") {
                console.log("deleted")
                continue;
            } else {
                console.log("exists")
                let hash: number = this.modularHash(oldTable[i][0], 0);
                let attemptNum: number = 1;

                if (newTable[hash] === undefined) {
                    newTable[hash] = oldTable[i];
                    continue;
                } else {
                    while (newTable[this.modularHash(oldTable[i][0], attemptNum)] !== undefined) {
                        attemptNum++
                    }
                }
                newTable[this.modularHash(oldTable[i][0], attemptNum)] = oldTable[i]
            }
            
        }
        return this.table = newTable;
    }

    put(key: string, value: string) {
        let attemptNum: number = 0;
        this.numItems++

        if (this.table[this.modularHash(key, attemptNum)] === undefined) {
            return this.table[this.modularHash(key, attemptNum)] = [key, value]
        } else {
            while (this.table[this.modularHash(key, attemptNum)] !== undefined) {
                ++attemptNum;
            }
        }

        if (this.numItems/this.mod > 0.5) {
            this.resize(1)
        }

        return this.table[this.modularHash(key, attemptNum)] = [key, value]
    }

    get(key: string) {

        for (let i = 0; i < this.mod+1; ++i) {
            if (this.table[this.modularHash(key, i)] === undefined) {
                continue;
            } else if (this.table[this.modularHash(key, i)] === "deleted") {
                continue;
            } else if (this.table[this.modularHash(key, i)][0] !== key) {
                continue;
            } else {
                return this.table[this.modularHash(key, i)][1];
            }
        }

        return undefined;
    }

    remove(key: string) {

        for (var i = 0; i < this.mod+1; ++i) {
            if (this.table[this.modularHash(key, i)] === undefined) {
                continue;
            } else if (this.table[this.modularHash(key, i)] === "deleted") {
                continue;
            } else if (this.table[this.modularHash(key, i)][0] !== key) {
                continue;
            } else {
                this.numItems--
                this.table[this.modularHash(key, i)] = "deleted"
                console.log(`${key} has been successfully deleted.`);
                break;
            }
        }

        if (this.table[this.modularHash(key, i)] !== "deleted") {
            console.log("\x1b[31m%s\x1b[0m", `Deletion of ${key} has failed.`);
        }

        if (this.mod >= this.min*2 && this.numItems/this.mod < 0.25) {
            this.resize(0)
        }
        
        return undefined
    }
}

// export default SomeHashTable;

console.log("\nPut phase\n----------\n")

const someHashTable = new SomeHashTable();
// console.log(someHashTable)
someHashTable.put("Jared Nielsen", "@jarednielsen"); // 1
// console.log(someHashTable.mod);
someHashTable.put("Raphael Cabrera", "@raphaelcabrera"); // 2
// console.log(someHashTable.mod);
someHashTable.put("NASA", "@nasa"); // 3
// console.log(someHashTable.mod);
someHashTable.put("Jaime Aranda", "@jaimearanda"); // 4
// console.log(someHashTable.mod);
someHashTable.put("Kevin Tang", "@ktang"); // 5
// console.log(someHashTable.mod);
someHashTable.put("Oscar Solano", "@osolano"); // 6
// console.log(someHashTable.mod);
someHashTable.put("Zhongyi Chen", "@zhongyichen"); // 7
// console.log(someHashTable.mod);
someHashTable.put("Michael Phelps", "@no1swimmer"); // 8
// console.log(someHashTable.mod);
someHashTable.put("Tevin Kang", "@tkang"); // 9
// console.log(someHashTable.mod);
someHashTable.put("Elon Musk", "@brainium"); // 10
// console.log(someHashTable.mod);
someHashTable.put("Rold Dahl", "@gr8books"); // 11
// console.log(someHashTable.mod);
someHashTable.put("Joe Biden", "@oldman"); // 12
// console.log(someHashTable.mod);
someHashTable.put("Donald Trump", "@goated"); // 13
// console.log(someHashTable.mod);
someHashTable.put("Abraham Lincoln", "@bighat"); // 14
// console.log(someHashTable.mod);
someHashTable.put("Matt Kroc", "@bigback"); // 15
// console.log(someHashTable.mod);
someHashTable.put("Bill ORiley", "@billy"); // 16
// console.log(someHashTable.mod);
someHashTable.put("Jake Reese", "@jakereese"); // 17
// console.log(someHashTable.mod);
someHashTable.put("John F Kennedy", "@jfk"); // 18
// console.log(someHashTable.mod);
someHashTable.put("Hunter Biden", "@crackboyz"); // 19
// console.log(someHashTable.mod);
someHashTable.put("Fernando Chacon", "@fchaca"); // 20
// console.log(someHashTable.mod);
someHashTable.put("Jesus Christ", "@literallygod") // 21
// console.log(someHashTable.mod);
someHashTable.put("Kanye West", "@jesusisking") // 22
// console.log(someHashTable.mod);
someHashTable.put("Gerard Way", "@boulivardofbdreams") // 23
// console.log(someHashTable.mod);
someHashTable.put("Taika Watiti", "@twatiti") // 24
// console.log(someHashTable.mod);
someHashTable.put("test", "@test") // 25
// console.log(someHashTable.mod);
someHashTable.put("tset", "@tset") // 26
// console.log(someHashTable.mod);
someHashTable.put("Lil Wayne", "@thecarter10") // 27
// console.log(someHashTable.mod);
someHashTable.put("Kendrick Lamar", "@damngkmc") // 28
// console.log(someHashTable.mod);
someHashTable.put("Tyler the Creator", "@ofwgkta") // 29
// console.log(someHashTable.mod);
someHashTable.put("Lunar Princess Ranni", "@moongirl") // 30
// console.log(someHashTable.mod);
someHashTable.put("ASAN", "@asan"); // 31
// console.log(someHashTable.mod);
someHashTable.put("Vegan Knit", "@veganknit") // 32
// console.log(someHashTable.mod);

// console.log(someHashTable);

// console.log("\nRemove phase\n -------------\n");

const getResult: string = someHashTable.get("Raphael Cabrera");
// console.log(getResult)

someHashTable.remove("Jared Nielsen"); // 1
// console.log(someHashTable.mod);
someHashTable.remove("Raphael Cabrera"); // 2
// console.log(someHashTable.mod);
someHashTable.remove("NASA"); // 3
// console.log(someHashTable.mod);
someHashTable.remove("Jaime Aranda"); // 4
// console.log(someHashTable.mod);
someHashTable.remove("Kevin Tang"); // 5
// console.log(someHashTable.mod);
someHashTable.remove("Oscar Solano"); // 6
// console.log(someHashTable.mod);
someHashTable.remove("Zhongyi Chen"); // 7
// console.log(someHashTable.mod);
someHashTable.remove("Michael Phelps"); // 8
// console.log(someHashTable.mod);
someHashTable.remove("Tevin Kang"); // 9
// console.log(someHashTable.mod);
someHashTable.remove("Elon Musk"); // 10
// console.log(someHashTable.mod);
someHashTable.remove("Rold Dahl"); // 11
// console.log(someHashTable.mod);
someHashTable.remove("Joe Biden"); // 12
// console.log(someHashTable.mod);
someHashTable.remove("Donald Trump"); // 13
// console.log(someHashTable.mod);
someHashTable.remove("Abraham Lincoln"); // 14
// console.log(someHashTable.mod);
someHashTable.remove("Matt Kroc"); // 15
// console.log(someHashTable.mod);
someHashTable.remove("Bill ORiley"); // 16
// console.log(someHashTable.mod);
someHashTable.remove("Jake Reese"); // 17
// console.log(someHashTable.mod);
someHashTable.remove("John F Kennedy"); // 18
// console.log(someHashTable.mod);
someHashTable.remove("Hunter Biden"); // 19
// console.log(someHashTable.mod);
someHashTable.remove("Fernando Chacon"); // 20
// console.log(someHashTable.mod);
someHashTable.remove("Jesus Christ") // 21
// console.log(someHashTable.mod);
someHashTable.remove("Kanye West") // 22
// console.log(someHashTable.mod);
someHashTable.remove("Gerard Way") // 23
// console.log(someHashTable.mod);
someHashTable.remove("Taika Watiti") // 24
// console.log(someHashTable.mod);
someHashTable.remove("test") // 25
// console.log(someHashTable.mod);
someHashTable.remove("tset") // 26
// console.log(someHashTable.mod);

console.log(someHashTable);

// someHashTable.remove("Kanye West");

// function initHash(key: string) {
//     let sum: number = 0;
//         for (let i: number = 0; i < key.length; ++i) {
//             sum += key.charCodeAt(i)
//         };

//     return sum;
// }

// console.log(initHash("Kanye West"))
