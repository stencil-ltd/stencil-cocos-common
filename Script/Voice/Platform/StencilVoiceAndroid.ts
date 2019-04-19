import StencilVoicePlatform from "./StencilVoicePlatform";
import StencilNative from "../../Native/StencilNative";

export default class StencilVoiceAndroid implements StencilVoicePlatform {

    private static className = "ltd/stencil/voice/StencilVoice"

    init() {
        this.call('initVoice')
    }

    isReady(): boolean {
        return this.call('isReady', '()Z') as boolean
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

    private call(method: string, signature: string = '()V', ...args: any[]): any {
        StencilNative.callJava(
            StencilVoiceAndroid.className,
            method,
            signature,
            ...args)
    }
}