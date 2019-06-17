import {Stencil} from "./SdkBoxIap";
import IapPlatform = Stencil.Purchasing.IapPlatform;
import ProductListener = Stencil.Purchasing.ProductListener;
import IapConfig = Stencil.Purchasing.IapConfig;
import IapConfigItem = Stencil.Purchasing.IapConfigItem;
import Product = Stencil.Purchasing.Product;
import {ListenWrapper} from "./ListenWrapper";
import IapConversion, {IapSimpleConfig} from "./IapConversion";

export class StencilIap {

    public static testPlatform: IapPlatform = IapPlatform.ios

    private static listener = new ListenWrapper()
    private static config: IapConfig = null
    private static simple: IapSimpleConfig = null

    public static isAvailable: boolean = false

    public static addListener(listener: ProductListener) {
        this.listener.addListener(listener)
    }

    public static removeListener(listener: ProductListener) {
        this.listener.removeListener(listener)
    }

    /**
     * Initialize Stencil's IAP wrapper. Good on you.
     * @param config - a path to config file in resources. If null, it will use the default location-- but prevents testing in browser/simulator.
     * @param listener - provide a single listener for all emitted IAP events.
     * @return true if IAP is available and successfully initialized.
     */
    public static init(config: IapSimpleConfig, listener: ProductListener): boolean {
        this.simple = config
        this.addListener(listener)

        let available = true
        if ('undefined' == typeof (sdkbox) || 'undefined' == typeof (sdkbox.IAP)) {
            console.log('sdkbox or sdkbox.IAP is undefined')
            available = false
        }
        this.isAvailable = available

        console.log(`StencilIap Init (real: ${available})`)

        if (this.isAvailable) {
            console.log(`setting listener`) // TODO need to do fake listener logic
            sdkbox.IAP.setListener(this.listener)
        }

        console.log(`Attempting to load config: ${JSON.stringify(config)}`)
        this._init(IapConversion.convert(config))
        return available
    }

    public static lookup(p: Product): IapConfigItem {
        let retval = this.simple.items.find(value => value.id == p.id)
        if (!retval) {
            switch (cc.sys.platform) {
                case cc.sys.ANDROID: {
                    retval = this.simple.android.items.find(value => value.id == p.id)
                    break
                }
                case cc.sys.IPHONE: {
                    retval = this.simple.ios.items.find(value => value.id == p.id)
                    break
                }
            }
        }
        return retval
    }

    private static _init(config: IapConfig) {
        const available = this.isAvailable
        this.config = config
        if (available) {
            console.log(`SDKBox available. Initializing with file.`)
            sdkbox.IAP.init(config)
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
        console.log(`Attempt purchase: ${id}`)
        if (!this.isAvailable) {
            console.log(`StencilIap Not Available`)
            this.fakePurchase(id)
            return
        }
        return sdkbox.IAP.purchase(id)
    }

    public static getProducts(): Product[] {
        if (!this.isAvailable) {
            return this.fakeProducts() as Product[]
        }
        return sdkbox.IAP.getProducts() as Product[]
    }

    public static scrubbedTitle(product: Product): string {
        let title = product.title
        if (!title) return product.id
        const index = title.indexOf('(')
        if (index >= 0) {
            title = title.slice(0, index).trim()
        }
        return title
    }

    private static fakePurchase(id: string) {
        const product = this.createFakeProduct(this.fakeProducts().find(value => value.id == id))
        if (window.confirm) {
            if (window.confirm(`Purchase item ${id}?`)) {
                this.listener.onSuccess(product)
            } else {
                this.listener.onFailure(product, 'Canceled')
            }
        } else {
            this.listener.onSuccess(product)
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