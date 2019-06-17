interface Array<T> {
    last(): T
    lastOrNull(): T|null
}

Array.prototype.last = function () {
    return this[this.length - 1]
}

Array.prototype.lastOrNull = function() {
    if (this.length == 0) return null
    return this.last()
}