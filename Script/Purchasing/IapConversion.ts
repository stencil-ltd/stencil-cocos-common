import {Stencil} from "./SdkBoxIap";
import IapConfig = Stencil.Purchasing.IapConfig;
import IapConfigItem = Stencil.Purchasing.IapConfigItem;
import IapConfigPlatform = Stencil.Purchasing.IapConfigPlatform;

export interface IapSimpleConfig {
    android?: {
        key: string
        items?: IapConfigItem[]
    }
    ios?: {
        items?: IapConfigItem[]
    }
    items: IapConfigItem[]
}

export default class IapConversion {

    public static convert(input: IapSimpleConfig): IapConfig {

        const iosItems = {}
        input.items.forEach(value => iosItems[value.id] = value)
        input.ios && input.ios.items && input.ios.items.forEach(value => iosItems[value.id] = value)

        const androidItems = {}
        input.items.forEach(value => androidItems[value.id] = value)
        input.android && input.android.items && input.android.items.forEach(value => androidItems[value.id] = value)

        return {
            android: {
                iap: {
                    key: input.android && input.android.key,
                    items: androidItems
                }
            },
            ios: {
                iap: {
                    items: iosItems
                }
            }
        }
    }
}