export default interface StencilTracker {
    identify(uid: string, args?: {[s: string]: string|number|boolean})
    track(event: string, args?: {[s: string]: string|number|boolean})
}