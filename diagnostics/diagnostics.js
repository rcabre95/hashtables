const jsonData = require('../../../data/first_names.json');

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
    // console.log(doubleHash.mod)

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
    console.log(doubleHash.mod);
    console.log("--------RemoveData-------\n")
    for (let i = 0; i < Math.abs(startingNum*amntToRem); i++) {
        doubleHash.remove(source[i])
    }
    console.log(doubleHash.mod)

}

function addDuplicates(key, value, numIts) {
console.log("------AddDuplicates------\n");

    for (let i = 0; i < numIts; i++) {
        doubleHash.put(key, value)
    }
};

export default {addData, removeData, addDuplicates}