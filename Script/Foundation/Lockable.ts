import {Subscribeable} from "./Subscribeable";

export interface Lockable extends Subscribeable<boolean> {
    isLocked(): boolean
    lock()
    unlock()
}