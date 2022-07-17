// const languages = ["Ada", "BASIC", "C", "Dart", "ECMAScript", "Fortran", "Go"];

// function simpleSearch(array, query) {
//     for (let i = 0; i < array.length; i++) {
//         if (array[i] === query) {
//             return i;
//         }
//     }
// };
// // simpleSearch() is in the order of O(n)
// // if we knew that "Fortran" was "the fifth element", we could look it up like so...
// let fifthElement = languages[5];
console.log("----- Results -----\n-------------------\n")
// let's do a hash table

class HashTable {
    constructor() {
        this.table = [] 
        this.mod = 29
        this.numItems = 0
        this.min = 29
    }

    modularHash(key) {
        let sum = 0;
        for (let j = 0; j < key.length; ++j) {
            sum += key.charCodeAt(j);
        }
        // console.log(`Sum: ${sum}`)
        let hash = sum % this.mod
        // console.log(`Hash: ${hash} \n`)
        return hash
    }

    resize(direction) {
        console.log("entering resize")
        // this.numItems = 0;
        let oldTable = this.table;
        // console.log(oldTable)
        console.log(oldTable.length)
        let newTable = [];
        this.mod = direction == 1 ? this.mod * 2 : Math.ceil(this.mod / 2);
        
        for (let i = 0; i < oldTable.length; i++) {
            if (!(oldTable[i] === undefined || oldTable[i] === "deleted")) {
                let hash = this.modularHash(oldTable[i][0]);

                if (newTable[hash] === undefined) {
                    newTable[hash] = oldTable[i]
                    continue;
                } else {
                    while (newTable[hash] !== undefined) {
                        hash++;
                    }
                }
                newTable[hash] = oldTable[i]
                continue;
            }
        }
        console.log("some string")
        console.log(oldTable);
        console.log(newTable);
        return this.table = newTable
    }
    

    put(key, value) {
        this.numItems++
        let hash = this.modularHash(key);
        
        if (this.table[hash] === undefined) {
            // console.log(this.numItems)
            return this.table[hash] = [key, value];
        } else {
            while (this.table[hash] !== undefined) {
                hash++;
            }
        }

        
        
        if (this.numItems/this.mod > 0.5) {
            this.resize(1)
        }
        return this.table[hash] = [key, value]
    }

    get(key) {
        let hash = this.modularHash(key);

        while (this.table[hash] !== undefined) {
            if (this.table[hash][0] === key) {
                return this.table[hash][1]
            }
            hash++;
        }

        return undefined
    }

    remove(key) {
        const exists = this.get(key)
        if (exists !== undefined) {
            this.numItems--
            if (this.mod >= this.min*2 && this.numItems/this.mod < 0.25) {
                this.resize(0)
            }
            return this.table[this.modularHash(key)] = "deleted"
        }
    }
    
};

const nums = Array.from(Array(1000).keys());
const test1 = nums.map((num) => {
    return num % 29
});

function testHash(key, mod) {
    let sum = 0;
    for (let i = 0; i < key.length; ++i) {
        sum += key.charCodeAt(i);
    }
    // console.log(`Sum: ${sum}`)
    let hash = sum % mod
    // console.log(`Hash: ${hash} \n`)
    return hash
}

const names = ["Jared Nielsen", "Raphael Cabrera", "NASA", "Jaime Aranda", "Kevin Tang", "Oscar Solano", "Peter North", "Gianna Michaels", "Teanna Trump", "Elon Musk", "Riley Reid", "Joe Biden", "Donald Trump", "Abraham Lincoln", "Matt Kroc", "Bill ORiley", "Jake Reese", "John F Kennedy", "Hunter Biden", "Fernando Chacon", "a",]

const hashes = names.map(name => {
    return {
        Before: testHash(name, 29),
        After: testHash(name, 58)
    }
})

console.log(hashes)

const hashTable = new HashTable();
// console.log(hashTable)
hashTable.put("Jared Nielsen", "@jarednielsen"); // 1
console.log(hashTable.mod)
hashTable.put("Raphael Cabrera", "@raphaelcabrera"); // 2
console.log(hashTable.mod)
hashTable.put("NASA", "@nasa"); // 3
console.log(hashTable.mod)
hashTable.put("Jaime Aranda", "@jaimearanda"); // 4
console.log(hashTable.mod)
hashTable.put("Kevin Tang", "@ktang"); // 5
console.log(hashTable.mod)
hashTable.put("Oscar Solano", "@osolano"); // 6
console.log(hashTable.mod)
hashTable.put("Zhongyi Chen", "@zhongyichen"); // 7
console.log(hashTable.mod)
hashTable.put("Gianna Michaels", "@giannam"); // 8
console.log(hashTable.mod)
hashTable.put("Teanna Trump", "@teannatrump"); // 9
console.log(hashTable.mod)
hashTable.put("Elon Musk", "@brainium"); // 10
console.log(hashTable.mod)
hashTable.put("Riley Reid", "@rileyreid"); // 11
console.log(hashTable.mod)
hashTable.put("Joe Biden", "@oldman"); // 12
console.log(hashTable.mod)
hashTable.put("Donald Trump", "@goated"); // 13
console.log(hashTable.mod)
hashTable.put("Abraham Lincoln", "@bighat"); // 14
console.log(hashTable.mod)
hashTable.put("Matt Kroc", "@bigback"); // 15
console.log(hashTable.mod)
hashTable.put("Bill ORiley", "@billy"); // 16
console.log(hashTable.mod)
hashTable.put("Jake Reese", "@jakereese"); // 17
console.log(hashTable.mod)
hashTable.put("John F Kennedy", "@jfk"); // 18
console.log(hashTable.mod)
hashTable.put("Hunter Biden", "@crackboyz"); // 19
console.log(hashTable.mod)
hashTable.put("Fernando Chacon", "@fchaca"); // 20
console.log(hashTable.mod)
hashTable.put("a", "@a") // 21
console.log(hashTable.mod)
hashTable.put("fuck", "@fuck") // 22
console.log(hashTable.mod)
hashTable.put("this", "@this") // 23
console.log(hashTable.mod)
hashTable.put("bull", "@bull") // 24
console.log(hashTable.mod)
hashTable.put("shit", "@shit") // 25
console.log(hashTable.mod)
hashTable.put("i", "@i") // 26
console.log(hashTable.mod)
hashTable.put("hate", "@hate") // 27
console.log(hashTable.mod)
hashTable.put("this", "@this") // 28
console.log(hashTable.mod)
hashTable.put("garbage", "@garbage") // 29
console.log(hashTable.mod)
hashTable.put("goddamnit", "@goddamnit") // 30
console.log(hashTable.mod)
// console.log(getTest)
// console.log(getTest)
// console.log(hashTable)
// hashTable.remove("Jared Nielsen");
// console.log(hashTable.mod)
// hashTable.remove("Raphael Cabrera");
// console.log(hashTable.mod)
// hashTable.remove("NASA", "@nasa");
// console.log(hashTable.mod)
// hashTable.remove("Jaime Aranda");
// console.log(hashTable.mod)
// hashTable.remove("Kevin Tang");
// console.log(hashTable.mod)
// hashTable.remove("Oscar Solano");
// console.log(hashTable.mod)
// hashTable.remove("Peter North");
// console.log(hashTable.mod)
// hashTable.remove("Gianna Michaels");
// console.log(hashTable.mod)
// hashTable.remove("Teanna Trump");
// console.log(hashTable.mod)
// hashTable.remove("Elon Musk");
// console.log(hashTable.mod)
// hashTable.remove("Riley Reid");
// console.log(hashTable.mod)
// hashTable.remove("Joe Biden");
// console.log(hashTable.mod)
// hashTable.remove("Donald Trump");
// console.log(hashTable.mod)
// hashTable.remove("Abraham Lincoln");
// console.log(hashTable.mod)
// hashTable.remove("Matt Kroc");
// console.log(hashTable.mod)
// hashTable.remove("Bill ORiley");
// console.log(hashTable.mod)

// console.log(hashTable)
