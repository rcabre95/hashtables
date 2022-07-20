"use strict";
exports.__esModule = true;
var diagnostic = require("../../../diagnostics/diagnostics.js");
var MyHashTable = /** @class */ (function () {
    function MyHashTable() {
        this.table = [];
        this.mod = 601;
        this.numItems = 0;
        this.min = 29;
    }
    MyHashTable.prototype.modularHash = function (key) {
        var sum = 0;
        for (var j = 0; j < key.length; j++) {
            sum += key.charCodeAt(j);
        }
        ;
        var hash = sum % this.mod;
        return hash;
    };
    MyHashTable.prototype.resize = function (direction) {
        this.mod = direction == 1 ? this.mod * 2 : this.mod / 2;
        var oldTable = this.table;
        var newTable = [];
        for (var i = 0; i < oldTable.length; i++) {
            if (oldTable[i] === undefined || oldTable[i] === "deleted") {
                continue;
            }
            else {
                var hash = this.modularHash(oldTable[i][0]);
                if (newTable[hash] === undefined) {
                    return newTable[hash] = oldTable[i];
                }
                else {
                    while (newTable[hash] !== undefined) {
                        hash++;
                    }
                }
            }
        }
        return this.table = newTable;
    };
    MyHashTable.prototype.put = function (key, value) {
        this.numItems++;
        var hash = this.modularHash(key);
        if (this.table[hash] === undefined) {
            return this.table[hash] = [key, value];
        }
        else {
            while (this.table[hash] !== undefined) {
                hash++;
            }
        }
        if (this.numItems / this.mod > 0.5) {
            console.log("resize up");
            this.resize(1);
        }
        return this.table[hash] = [key, value];
    };
    MyHashTable.prototype.get = function (key) {
        var hash = this.modularHash(key);
        while (this.table[hash] !== undefined) {
            if (this.table[hash] === "deleted") {
                hash++;
            }
            else if (this.table[hash][0] !== key) {
                hash++;
            }
            else {
                return this.table[hash][1];
            }
        }
        return undefined;
    };
    MyHashTable.prototype.remove = function (key) {
        var hash = this.modularHash(key);
        while (this.table[hash] !== undefined) {
            if (this.table[hash] === "deleted") {
                hash++;
            }
            else if (this.table[hash][0] !== key) {
                hash++;
            }
            else {
                this.numItems--;
                this.table[hash] = "deleted";
            }
        }
        if (this.numItems / this.mod < 0.25 && this.mod > this.min * 2) {
            console.log("resize down");
            this.resize(0);
        }
        return undefined;
    };
    return MyHashTable;
}());
var myHashTable = new MyHashTable;
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
console.log(myHashTable);
