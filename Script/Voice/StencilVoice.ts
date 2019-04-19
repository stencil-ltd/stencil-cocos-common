import StencilNative from "../Native/StencilNative";
import StencilVoicePlatform from "./Platform/StencilVoicePlatform";
import place = cc.place;
import StencilVoiceAndroid from "./Platform/StencilVoiceAndroid";
import StencilVoiceIos from "./Platform/StencilVoiceIos";

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

    private static platform: StencilVoicePlatform = null;

    public static init(listener: StencilVoiceListener) {
        window['stencil'] = window['stencil'] || {}
        window['stencil'].voice = {
            listener: listener
        }
        switch (cc.sys.os) {
            case cc.sys.OS_ANDROID:
                this.platform = new StencilVoiceAndroid()
                break
            case cc.sys.OS_IOS:
                this.platform = new StencilVoiceIos()
                break
            default:
                cc.error("Can't find platform for voice.")
                break
        }
        console.log(`StencilVoice init: ${this.platform.constructor.name}`)
        this.platform && this.platform.init()
    }

    public static isReady(): boolean {
        return this.platform && this.platform.isReady()
    }

    public static startListening() {
        this.platform && this.platform.startListening()
    }

    public static stopListening() {
        this.platform && this.platform.stopListening()
    }

    public static destroy() {
        this.platform && this.platform.destroy()
    }
}