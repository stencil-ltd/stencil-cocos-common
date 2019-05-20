export default interface StencilTracker {
    identify(uid: string, args?: {[s: string]: string|number|boolean})
    track(event: string, args?: {[s: string]: string|number|boolean})
    set(property: string, value: string|number|boolean)
}