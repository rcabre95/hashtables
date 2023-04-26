var LinkedList = /** @class */ (function () {
    function LinkedList(value) {
        this.value = value;
        this.next = null;
    }
    return LinkedList;
}());
var arrayOne = [4, 7, 1];
var LLone = new LinkedList(2);
var currentNode = LLone;
for (var i = 0; i < arrayOne.length; i++) {
    currentNode.next = new LinkedList(arrayOne[i]);
    currentNode = currentNode.next;
}
var arrayTwo = [4, 5];
var LLtwo = new LinkedList(9);
var currentNode2 = LLtwo;
for (var i = 0; i < arrayOne.length; i++) {
    currentNode2.next = new LinkedList(arrayTwo[i]);
    currentNode2 = currentNode2.next;
}
function linkedSumHelper(linkedListOne, linkedListTwo, runningTotal, place) {
    if (runningTotal === void 0) { runningTotal = 0; }
    if (place === void 0) { place = 0; }
    var sum = runningTotal;
    if (linkedListOne === null && linkedListTwo !== null) {
        sum += linkedListTwo.value * Math.pow(10, place);
        return linkedSumHelper(null, linkedListTwo.next, sum, place + 1);
    }
    if (linkedListTwo === null && linkedListOne !== null) {
        sum += linkedListOne.value * Math.pow(10, place);
        return linkedSumHelper(linkedListOne.next, null, sum, place + 1);
    }
    if (linkedListTwo === null && linkedListOne === null) {
        return sum;
    }
    if (linkedListOne !== null && linkedListTwo !== null) {
        return linkedSumHelper(linkedListOne.next, linkedListTwo.next, sum, place + 1);
    }
}
console.groupCollapsed(LLone);
console.log(LLtwo);
console.log(linkedSumHelper(LLone, LLtwo, 0, 0));
