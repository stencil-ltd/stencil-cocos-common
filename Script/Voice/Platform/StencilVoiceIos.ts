import StencilVoicePlatform from "./StencilVoicePlatform";
import StencilNative from "../../Native/StencilNative";

export default class StencilVoiceIos implements StencilVoicePlatform {

    private static className = "StencilVoice"

    init() {
        this.call('initVoice')
    }

    isReady(): boolean {
        return this.call('isReady') as boolean
    }

    startListening() {
        this.call('startListening')
    }

    stopListening() {
        this.call('stopListening')
    }

    destroy() {
        this.call('destroy')
    }

    private call(method: string, ...args: any[]): any {
        StencilNative.callIos(
            StencilVoiceIos.className,
            method,
            ...args)
    }

}