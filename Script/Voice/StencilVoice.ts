import StencilNative from "../Native/StencilNative";

export interface StencilVoiceGlobal {
    listener: StencilVoiceListener
}

export interface StencilVoiceListener {
    onInit?()
    onSpeechReady?()
    onSpeechBegin?()
    onSpeechEnd?()
    onWordsReceived?(words: string[])
    onFinalResults?(phrase: string)
    onPermissionGranted?()
    onPermissionDenied?()
    onError?(code: number)
}

export default class StencilVoice {

    private static className = "ltd/stencil/voice/StencilVoice"

    public static init(listener: StencilVoiceListener) {
        window['stencil'] = window['stencil'] || {}
        window['stencil'].voice = {
            listener: listener
        }
        this.call('init')
    }

    public static isReady(): boolean {
        return this.call('isReady', '()Z') as boolean
    }

    public static startListening() {
        this.call('startListening')
    }

    public static stopListening() {
        this.call('stopListening')
    }

    public static destroy() {
        this.call('destroy')
    }

    private static call(method: string, signature: string = '()V', ...args: any[]): any {
        StencilNative.call(
            this.className,
            method,
            signature,
            ...args)
    }
}