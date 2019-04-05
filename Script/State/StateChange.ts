export class StateChange<T> {

    public readonly oldValue: T|null
    public readonly newValue: T

    constructor(oldValue: T|null, newValue: T) {
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
}