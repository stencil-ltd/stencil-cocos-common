import ProductListener = Stencil.Purchasing.ProductListener;
import Product = Stencil.Purchasing.Product;

export class StencilIap {

    public static isAvailable(): boolean {
        if ('undefined' == typeof(sdkbox)) {
            console.log('sdkbox is undefined')
            return false
        }
        if ('undefined' == typeof(sdkbox.IAP)) {
            console.log('sdkbox.IAP is undefined')
            return false
        }
        return true
    }

    public static init(listener: ProductListener): boolean {
        console.log(`StencilIap Init`)
        if (!this.isAvailable()) {
            console.log(`StencilIap Not Available`)
            return false
        }
        console.log(`StencilIap Set Listener`)
        sdkbox.IAP.setListener(listener)

        // @ts-ignore
        sdkbox.IAP.init()
        console.log(`StencilIap configured.`)

        console.log(`Attempting to refresh IAP listings...`)
        sdkbox.IAP.refresh()
    }

    public static purchase(id: string) {
        if (!this.isAvailable()) {
            console.log(`StencilIap Not Available`)
            this.fakePurchase(id)
            return
        }
        console.log(`Attempt purchase: ${id}`)
        return sdkbox.IAP.purchase(id)
    }

    public static getProducts(): Product[] {
        if (!this.isAvailable()) {
            console.log(`StencilIap Not Available`)
            return []
        }
        return sdkbox.IAP.getProducts() as Product[]
    }

    private static fakePurchase(id: string) {
        if (window.confirm(`Purchase item ${id}?`)) {
            // TODO grant
        }
    }
}