import {Stencil} from "./SdkBoxIap";
import IapPlatform = Stencil.Purchasing.IapPlatform;
import ProductListener = Stencil.Purchasing.ProductListener;
import IapConfig = Stencil.Purchasing.IapConfig;
import IapConfigItem = Stencil.Purchasing.IapConfigItem;
import Product = Stencil.Purchasing.Product;

export class StencilIap {

    public static testPlatform: IapPlatform = IapPlatform.ios

    private static listener: ProductListener = null
    private static config: IapConfig = null

    public static isAvailable: boolean = false

    /**
     * Initialize Stencil's IAP wrapper. Good on you.
     * @param config - a path to config file in resources. If null, it will use the default location-- but prevents testing in browser/simulator.
     * @param listener - provide a single listener for all emitted IAP events.
     * @return true if IAP is available and successfully initialized.
     */
    public static init(config: string = null, listener: ProductListener): boolean {
        this.listener = listener

        const available = true
        if ('undefined' == typeof(sdkbox) || 'undefined' == typeof(sdkbox.IAP)) {
            console.log('sdkbox or sdkbox.IAP is undefined')
            this.isAvailable = false
        }

        console.log(`StencilIap Init (real: ${available})`)

        if (this.isAvailable) {
            console.log(`setting listener`) // TODO need to do fake listener logic
            sdkbox.IAP.setListener(listener)
        }

        if (config) {
            console.log(`Attempting to load config: ${config}`)
            cc.loader.loadRes(config, cc.JsonAsset, (error, resource) => {
                const str = resource ? JSON.stringify(resource.json) : null;
                console.log(`loaded config: ${str} (${error})`)
                if (error) {
                    console.error(error.message)
                    return
                }
                this._init(str)
            })
        } else {
            this._init()
        }

        return available
    }

    private static _init(configRes?: string) {
        const available = this.isAvailable
        if (configRes && configRes.length > 0) {
            console.log(`Found config file.`)
            this.config = JSON.parse(configRes)
            if (available) {
                console.log(`SDKBox available. Initializing with file.`)
                // @ts-ignore
                sdkbox.IAP.init(configRes)
            }
        } else {
            console.log(`Could not load config file.`)
            if (available) {
                console.log(`SDKBox available. Initializing with default file.`)
                // @ts-ignore
                sdkbox.IAP.init()
            }
        }

        console.log(`StencilIap configured.`)
        this.refresh()
    }

    public static refresh() {
        console.log(`Attempting to refresh IAP listings...`)
        if (this.isAvailable) {
            console.log(`SDKBox available. Executing real refresh.`)
            sdkbox.IAP.refresh()
        } else {
            console.log(`SDKBox not available. Not refreshing.`)
        }
    }

    public static purchase(id: string) {
        if (!this.isAvailable) {
            console.log(`StencilIap Not Available`)
            this.fakePurchase(id)
            return
        }
        console.log(`Attempt purchase: ${id}`)
        return sdkbox.IAP.purchase(id)
    }

    public static getProducts(): Product[] {
        if (!this.isAvailable) {
            return this.fakeProducts() as Product[]
        }
        return sdkbox.IAP.getProducts() as Product[]
    }

    private static fakePurchase(id: string) {
        if (window.confirm(`Purchase item ${id}?`)) {
            // TODO grant
        }
    }

    private static fakeProducts(): IapConfigItem[] {
        const retval: IapConfigItem[] = []
        if (this.testPlatform && this.config) {
            let values = {}
            switch (this.testPlatform) {
                case IapPlatform.ios:
                    console.log(`Using fake products for iOS`)
                    values = this.config.ios.iap.items
                    break;
                case IapPlatform.android:
                    console.log(`Using fake products for Android`)
                    values = this.config.android.iap.items
                    break;
                default:
                    console.error('Not sure what products to fake with.')
                    values = new Map<string, IapConfigItem>()
            }
            const items = Object.values(values) as IapConfigItem[]
            items.forEach(value => {
                retval.push(this.createFakeProduct(value))
            })
        }
        return retval
    }

    private static createFakeProduct(item: IapConfigItem): Product {
        const priceValue = item.priceValue || 1.99
        return {
            id: item.id,
            name: item.id,
            title: item.title || "UNKNOWN TITLE",
            description: item.description || "UNKNOWN DESCRIPTION",
            currencyCode: "USD",
            priceValue: priceValue,
            price: item.price || `$${priceValue}`
        }
    }
}