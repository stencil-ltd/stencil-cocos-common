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

        const stripFakeFields = true
        const skipAndroid = true
        const skipIos = false

        const iosItems = {}
        input.items.forEach(value => iosItems[value.id] = value)
        input.ios && input.ios.items && input.ios.items.forEach(value => iosItems[value.id] = value)

        const androidItems = {}
        input.items.forEach(value => androidItems[value.id] = value)
        input.android && input.android.items && input.android.items.forEach(value => androidItems[value.id] = value)

        if (stripFakeFields) {
            console.log(`Stripping fake fields from IAP Spec...`)
            Object.values(iosItems).forEach(value => {
                this.stripFakeFields(value as IapConfigItem)
            })

            Object.values(androidItems).forEach(value => {
                this.stripFakeFields(value as IapConfigItem)
            })
        }

        const retval = {}
        if (!skipAndroid) {
            retval['android'] = {
                iap: {
                    key: input.android && input.android.key,
                    items: androidItems
                }
            }
        }
        if (!skipIos) {
            retval['ios'] = {
                iap: {
                    items: iosItems
                }
            }
        }

        return <IapConfig>retval
    }

    private static stripFakeFields(item: IapConfigItem) {
        const whitelist = ['id', 'type']
        const keys = Object.keys(item)
        const badkeys = keys.filter(value => !whitelist.includes(value))
        badkeys.forEach(key => delete item[key])
    }
}