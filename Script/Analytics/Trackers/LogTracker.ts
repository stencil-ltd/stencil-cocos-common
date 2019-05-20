import StencilTracker from "../StencilTracker";

export default class LogTracker implements StencilTracker {

    identify(uid: string, args?: { [p: string]: string | number | boolean }) {
        console.log(`Tracking: identify ${uid} (${JSON.stringify(args)})`)
    }

    set(property: string, value: string | number | boolean) {
        console.log(`Tracking: set property ${property} = ${value}`)
    }

    track(event: string, args?: { [p: string]: string | number | boolean }) {
        console.log(`Tracking: event ${event} (${JSON.stringify(args)})`)
    }
}