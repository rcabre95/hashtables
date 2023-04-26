type StringObjPair = [string, IValueObject] | "deleted" | undefined;

interface IValueObject {
    fName: string;
    lName: string;
}

class DoubleHash {
    public table: StringObjPair[];
    private mod: number;
    private min: number;
    private numItems: number;
    constructor(value = 71, min = 29) {
        this.table = [];
        this.mod = value;
        this.min = min;
        this.numItems = 0;
    }

    protected hashTwo(key: string) {
        return key.toString().length % this.mod;
    }

    protected hashOne(key: string) {
        let sum: number = 0;
        for (let i = 0; i < key.length; i++) {
            sum += key.charCodeAt(i);
        }

        let hash = sum % this.mod;

        return hash;
    }

    insert(key: string, value: IValueObject) {
        let hashOne = this.hashOne(key);
        let hashTwo = this.hashTwo(key);
        let attempt = 0;
        let hash = (hashOne + attempt * hashTwo) % this.mod
        if (this.table[hash] === null)
    }

    remove(key:string) {

    }

    get(key: string) {

    }

    resize() {

    }
}