interface Array<T> {
    last(): T
    lastOrNull(): T|null
    first<R>(fn: (value: T) => R|null|undefined): R|null
    halves(roundUp?: boolean): T[][]
}

Array.prototype.last = function () {
    return this[this.length - 1]
}

Array.prototype.lastOrNull = function() {
    if (this.length == 0) return null
    return this.last()
}

Array.prototype.first = function<R> (fn: (value) => R|null|undefined): R|null {
    for (let x = 0; x < this.length; ++x) {
        const result = fn(this[x])
        if (result) return result
    }
    return null
}

//https://stackoverflow.com/a/47777083
Array.prototype.halves = function(roundUp: boolean = false) {
    let yourArray = this
    let halfWayThough = roundUp ? Math.ceil(yourArray.length / 2) : Math.floor(yourArray.length / 2)
    let arrayFirstHalf = yourArray.slice(0, halfWayThough);
    let arraySecondHalf = yourArray.slice(halfWayThough, yourArray.length);
    return [arrayFirstHalf, arraySecondHalf]
}