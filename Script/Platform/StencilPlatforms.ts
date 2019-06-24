import {Platform} from "../Ui/PlatformVisible";
import PlatformSwitch from "./PlatformSwitch";

export default class StencilPlatforms {

    // @ts-ignore
    public static platformString: "ios" | "android" | "simulator" =
        new PlatformSwitch<string>()
            .withDefault("simulator")
            .withIos("ios")
            .withAndroid("android")
            .value()

    public static isAndroid() {
        return cc.sys.platform == cc.sys.ANDROID
    }

    public static isIos() {
        return cc.sys.platform == cc.sys.IPHONE
    }

    public static isMobileBrowser() {
        return cc.sys.platform == cc.sys.MOBILE_BROWSER
    }

    public static isPreview() {
        return CC_PREVIEW
    }
}