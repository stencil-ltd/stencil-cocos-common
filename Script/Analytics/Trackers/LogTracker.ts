import StencilTracker from "../StencilTracker";

export default class LogTracker implements StencilTracker {

    identify(uid: string) {
        console.log(`Tracking: identify ${uid}`)
    }

    track(event: string, args?: { [p: string]: string | number | boolean }) {
        console.log(`Tracking: event ${event} (${JSON.stringify(args)})`)
    }
}