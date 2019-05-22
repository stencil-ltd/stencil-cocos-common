import StencilTracker from "./StencilTracker";
import LogTracker from "./Trackers/LogTracker";
import TrackingArgs from "./TrackingArgs";

export default class StencilAnalytics implements StencilTracker {

    private static _instance: StencilAnalytics = new StencilAnalytics()
    public static instance() { return this._instance; }

    private _trackers: StencilTracker[] = []
    private _interceptors: ((args: TrackingArgs) => void)[] = []

    public init(trackers: StencilTracker[]) {
        this._trackers = trackers
        if (CC_DEBUG) {
            this.add(new LogTracker())
        }
    }

    public add(tracker: StencilTracker) {
        this._trackers.push(tracker)
    }

    public intercept(interceptor: (args: TrackingArgs) => void) {
        this._interceptors.push(interceptor)
    }

    identify(uid: string) {
        this._trackers.forEach(value => value.identify(uid))
    }

    track(event: string, args?: { [p: string]: string | number | boolean }) {
        args = args || {}
        this._interceptors.forEach(value => value(args))
        this._trackers.forEach(value => value.track(event, args))
    }
}
