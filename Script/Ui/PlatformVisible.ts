import menu = cc._decorator.menu;
import property = cc._decorator.property;
import {RegisterableComponent} from "./Lifecycle/RegisterableComponent";

const {ccclass} = cc._decorator;

export enum Platform {
    Preview,
    Android,
    Ios
}

@ccclass
@menu("Stencil/Ui/PlatformVisible")
export default class PlatformVisible extends cc.Component {

    public static currentPlatform(): Platform {
        switch (cc.sys.platform) {
            case cc.sys.ANDROID:
                return Platform.Android
            case cc.sys.IPHONE:
                return Platform.Ios
            default:
                return Platform.Preview
        }
    }

    @property({ type: [cc.Enum(Platform)] })
    public platforms: Platform[] = [Platform.Preview]

    protected start(): void {
        if (!this.platforms.includes(PlatformVisible.currentPlatform()))
            this.node.active = false
    }
}
