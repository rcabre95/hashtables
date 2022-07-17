class HashTable {
    constructor() {
        this.table = []
    }

    // add resizing functionality

    modularHash(key) {
        let sum = 0;

        for (let i = 0; i < key.length; ++i) {
            sum += key.charCodeAt(i);
        }

        let hash = sum % 71;
        return hash;
    }

    put(key, value) {
        let hash = this.modularHash(key);
        if (this.table[hash] === undefined) {
            this.table[hash] = []
        }
        return this.table[hash].push([key,value])
    }

    get(key) {
        let hash = this.modularHash(key);

        for (let i = 0; i < this.table[hash].length; i++) {
            if (this.table[hash][i][0] === key) {
                return this.table[hash][i][1];
            }
        }
        
        return undefined
    }

    remove(key) {
        let hash = this.modularHash(key);

        for (let i = 0; i < this.table[hash].length; i++) {
            if ( this.table[hash][i][0] === key) {
                return delete this.table[hash][i]
            }
        }

        return undefined
    }
}

const hashTable = new HashTable();
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
console.log(hashTable)
hashTable.put("fuck", "@fuck") // 22
console.log(hashTable)
hashTable.put("this", "@this") // 23
console.log(hashTable)
hashTable.put("bull", "@bull") // 24
console.log(hashTable)
hashTable.put("shit", "@shit") // 25
console.log(hashTable)
hashTable.put("i", "@i") // 26
console.log(hashTable)
hashTable.put("hate", "@hate") // 27
console.log(hashTable)
hashTable.put("this", "@this") // 28
console.log(hashTable)
hashTable.put("garbage", "@garbage") // 29
console.log(hashTable)
hashTable.put("goddamnit", "@goddamnit") // 21
console.log(hashTable)