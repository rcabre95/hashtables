var require;
var jsonData = require('../../../data/first_names.json');
console.log("----- Results -----\n-------------------\n");
var DoubleHashTable = /** @class */ (function () {
    function DoubleHashTable() {
        this.table = [];
        this.mod = 41;
        this.numItems = 0;
        this.min = 29;
    }
    DoubleHashTable.prototype.modularHash2 = function (key) {
        var tel = 0;
        for (var l = 0; l < key.length; l++) {
            if (l % 2 === 0) {
                tel += key.charCodeAt(l);
            }
            else {
                tel -= key.charCodeAt(l);
            }
        }
        var hash2 = Math.abs(tel % key.length);
        return hash2;
    };
    DoubleHashTable.prototype.modularHash1 = function (key, attempt) {
        var sum = 0;
        for (var k = 0; k < key.length; k++) {
            sum += key.charCodeAt(k);
        }
        var hash2 = this.modularHash2(key);
        var hash = (sum + attempt * hash2) % this.mod;
        return hash;
    };
    DoubleHashTable.prototype.resize = function () {
        console.log("entered resize");
        var oldTable = this.table;
        var newTable = [];
        for (var i = 0; i < oldTable.length; i++) {
            var currentBucket = oldTable[i];
            if (currentBucket === undefined) {
                continue;
            }
            else if (currentBucket === "deleted") {
                continue;
            }
            else {
                var attemptNum = 0;
                if (newTable[this.modularHash1(currentBucket[0], attemptNum)] === undefined) {
                    newTable[this.modularHash1(currentBucket[0], attemptNum)] = currentBucket;
                    continue;
                }
                else {
                    while (newTable[this.modularHash1(currentBucket[0], attemptNum)] !== undefined) {
                        attemptNum++;
                    }
                }
                // this.put(currentBucket[0], currentBucket[1], this.mod*2);
            }
        }
        return this.table = newTable;
    };
    DoubleHashTable.prototype.put = function (key, value) {
        // put function is fucked up
        var attemptNum = 0;
        if (this.table[this.modularHash1(key, attemptNum)] === undefined) {
            this.numItems++;
            return this.table[this.modularHash1(key, attemptNum)] = [key, value];
        }
        else {
            while (this.table[this.modularHash1(key, attemptNum)] !== undefined) {
                ++attemptNum;
            }
        }
        if (this.numItems / this.mod > 0.5) {
            this.mod = this.mod * 2;
            this.resize();
        }
        return this.table[this.modularHash1(key, attemptNum)] = [key, value];
    };
    DoubleHashTable.prototype.remove = function (key) {
        //somethings wrong with removals. fix it.
        for (var i = 0; i < this.numItems; i++) {
            if (this.table[this.modularHash1(key, i)] === undefined) {
                continue;
            }
            else if (this.table[this.modularHash1(key, i)] === "deleted") {
                continue;
            }
            else if (this.table[this.modularHash1(key, i)][0] !== key) {
                continue;
            }
            else {
                this.numItems--;
                console.log("".concat(key, " has been successfully deleted."));
                return this.table[this.modularHash1(key, i)] = "deleted";
            }
        }
        if (i == this.numItems && this.table[this.modularHash1(key, i)] !== "deleted") {
            console.log("\x1b[31m%s\x1b[0m", "Deletion of ".concat(key, " has failed."));
        }
        if (this.numItems / this.mod < 0.25 && this.mod > this.min * 2) {
            this.mod = this.mod / 2;
            this.resize();
        }
        return undefined;
    };
    DoubleHashTable.prototype.get = function (key) {
        // theory: if the key exists or ever existed in the hashtable, then .get should never return undefined. test by removing undefined conditional clause.
        var attemptNum = 0;
        while (this.table[this.modularHash1(key, attemptNum)] !== undefined) {
            console.log(attemptNum);
            if (this.table[this.modularHash1(key, attemptNum)] === "deleted") {
                attemptNum++;
                continue;
            }
            else if (this.table[this.modularHash1(key, attemptNum)][0] !== key) {
                attemptNum++;
                continue;
            }
            else {
                return this.table[this.modularHash1(key, attemptNum)][1];
            }
        }
        // for (let i = 0; i < this.numItems; i++) {
        //     if (this.table[this.modularHash1(key, i)] === "deleted") {
        //         continue;
        //     } else if (this.table[this.modularHash1(key, i)][0] !== key) {
        //         continue;
        //     } else {
        //         return this.table[this.modularHash1(key, i)][1]
        //     }
        // }
        return undefined;
    };
    return DoubleHashTable;
}());
var doubleHash = new DoubleHashTable();
doubleHash.put("Jared Nielsen", "@jarednielsen"); // 1
// console.log(doubleHash.mod);
doubleHash.put("Raphael Cabrera", "@raphaelcabrera"); // 2
// console.log(doubleHash.mod);
doubleHash.put("NASA", "@nasa"); // 3
// console.log(doubleHash.mod);
doubleHash.put("Jaime Aranda", "@jaimearanda"); // 4
// console.log(doubleHash.mod);
doubleHash.put("Kevin Tang", "@ktang"); // 5
// console.log(doubleHash.mod);
doubleHash.put("Oscar Solano", "@osolano"); // 6
// console.log(doubleHash.mod);
doubleHash.put("Zhongyi Chen", "@zhongyichen"); // 7
// console.log(doubleHash.mod);
doubleHash.put("Michael Phelps", "@no1swimmer"); // 8
// console.log(doubleHash.mod);
doubleHash.put("Tevin Kang", "@tkang"); // 9
// console.log(doubleHash.mod);
doubleHash.put("Elon Musk", "@brainium"); // 10
// console.log(doubleHash.mod);
doubleHash.put("Rold Dahl", "@gr8books"); // 11
// console.log(doubleHash.mod);
doubleHash.put("Joe Biden", "@oldman"); // 12
// console.log(doubleHash.mod);
doubleHash.put("Donald Trump", "@goated"); // 13
// console.log(doubleHash.mod);
// doubleHash.put("Abraham Lincoln", "@bighat"); // 14
// // console.log(doubleHash.mod);
// doubleHash.put("Matt Kroc", "@bigback"); // 15
// // console.log(doubleHash.mod);
// doubleHash.put("Bill ORiley", "@billy"); // 16
// // console.log(doubleHash.mod);
// doubleHash.put("Jake Reese", "@jakereese"); // 17
// // console.log(doubleHash.mod);
// doubleHash.put("John F Kennedy", "@jfk"); // 18
// // console.log(doubleHash.mod);
// doubleHash.put("Hunter Biden", "@crackboyz"); // 19
// // console.log(doubleHash.mod);
// doubleHash.put("Fernando Chacon", "@fchaca"); // 20
// // console.log(doubleHash.mod);
// doubleHash.put("Jesus Christ", "@literallygod") // 21
// // console.log(doubleHash.mod);
// doubleHash.put("Kanye West", "@jesusisking") // 22
// // console.log(doubleHash.mod);
// doubleHash.put("Gerard Way", "@boulivardofbdreams") // 23
// // console.log(doubleHash.mod);
// doubleHash.put("Taika Watiti", "@twatiti") // 24
// // console.log(doubleHash.mod);
// doubleHash.put("test", "@test") // 25
// // console.log(doubleHash.mod);
// doubleHash.put("tset", "@tset") // 26
// // console.log(doubleHash.mod);
// doubleHash.put("Lil Wayne", "@thecarter10") // 27
// // console.log(doubleHash.mod);
// doubleHash.put("Kendrick Lamar", "@damngkmc") // 28
// // console.log(doubleHash.mod);
// doubleHash.put("Tyler the Creator", "@ofwgkta") // 29
// // console.log(doubleHash.mod);
// doubleHash.put("Lunar Princess Ranni", "@moongirl") // 30
// // console.log(doubleHash.mod);
// doubleHash.put("ASAN", "@asan"); // 31
// // console.log(doubleHash.mod);
// doubleHash.put("Vegan Knit", "@veganknit") // 32
// // console.log(doubleHash.mod);
console.log(doubleHash);
var getTest = doubleHash.get("Kevin Tang");
console.log("Kevin Tang: ".concat(getTest));
// console.log(doubleHash.table[4])
// console.log(doubleHash);
// doubleHash.remove("Jared Nielsen"); // 1
// // console.log(doubleHash.mod);
// doubleHash.remove("Raphael Cabrera"); // 2
// // console.log(doubleHash.mod);
// doubleHash.remove("NASA"); // 3
// // console.log(doubleHash.mod);
// doubleHash.remove("Jaime Aranda"); // 4
// // console.log(doubleHash.mod);
// doubleHash.remove("Kevin Tang"); // 5
// // console.log(doubleHash.mod);
// doubleHash.remove("Oscar Solano"); // 6
// // console.log(doubleHash.mod);
// doubleHash.remove("Zhongyi Chen"); // 7
// // console.log(doubleHash.mod);
// doubleHash.remove("Michael Phelps"); // 8
// // console.log(doubleHash.mod);
// doubleHash.remove("Tevin Kang"); // 9
// // console.log(doubleHash.mod);
// doubleHash.remove("Elon Musk"); // 10
// // console.log(doubleHash.mod);
// doubleHash.remove("Rold Dahl"); // 11
// // console.log(doubleHash.mod);
// doubleHash.remove("Joe Biden"); // 12
// // console.log(doubleHash.mod);
// doubleHash.remove("Donald Trump"); // 13
// // console.log(doubleHash.mod);
// doubleHash.remove("Abraham Lincoln"); // 14
// // console.log(doubleHash.mod);
// doubleHash.remove("Matt Kroc"); // 15
// // console.log(doubleHash.mod);
// doubleHash.remove("Bill ORiley"); // 16
// // console.log(doubleHash.mod);
// doubleHash.remove("Jake Reese"); // 17
// // console.log(doubleHash.mod);
// doubleHash.remove("John F Kennedy"); // 18
// // console.log(doubleHash.mod);
// doubleHash.remove("Hunter Biden"); // 19
// // console.log(doubleHash.mod);
// doubleHash.remove("Fernando Chacon"); // 20
// // console.log(doubleHash.mod);
// doubleHash.remove("Jesus Christ") // 21
// // console.log(doubleHash.mod);
// doubleHash.remove("Kanye West") // 22
// // console.log(doubleHash.mod);
// doubleHash.remove("Gerard Way") // 23
// // console.log(doubleHash.mod);
// doubleHash.remove("Taika Watiti") // 24
// // console.log(doubleHash.mod);
// doubleHash.remove("test") // 25
// // console.log(doubleHash.mod);
// doubleHash.remove("tset") // 26
// // console.log(doubleHash.mod);
// console.log(doubleHash);
function modularHash2(key) {
    var tel = 0;
    for (var l = 0; l < key.length; l++) {
        if (l % 2 === 0) {
            tel += key.charCodeAt(l);
        }
        else {
            tel -= key.charCodeAt(l);
        }
    }
    var hash2 = Math.abs(tel % key.length);
    // let hash2: number = Math.abs(key.charCodeAt(key.length - 1) + key.charCodeAt(0) - key.length);
    return hash2;
}
var hash2Test = modularHash2('NASA');
console.log("Hash2  of NASA: ".concat(hash2Test));
function modularHash1(key, attempt) {
    var sum = 0;
    for (var k = 0; k < key.length; k++) {
        sum += key.charCodeAt(k);
    }
    var hash2 = modularHash2(key);
    var hash = (sum + attempt * hash2) % 82;
    console.log("Hash of ".concat(key, " at ").concat(attempt, " attempts is ").concat(hash));
    return hash;
}
console.log(doubleHash.table[modularHash1("Kevin Tang", 0)]);
// console.log(doubleHash.table[modularHash1("Jaime Aranda", 0)]);
// console.log(doubleHash.table[modularHash1("test", 0)]);
// console.log(doubleHash.table[modularHash1("tset", 2)]);
