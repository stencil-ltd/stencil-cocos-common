interface Array<T> {
    last(): T
    lastOrNull(): T|null
    first<R>(fn: (value: T) => R|null|undefined): R|null
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