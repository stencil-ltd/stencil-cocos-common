export default class StencilPlatforms {

    public static isAndroid() {
        return cc.sys.platform == cc.sys.ANDROID
    }

    public static isIos() {
        return cc.sys.platform == cc.sys.IPHONE
    }
}