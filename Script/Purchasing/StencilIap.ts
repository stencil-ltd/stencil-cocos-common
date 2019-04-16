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

}

class ListenWrapper implements ProductListener {

    private readonly inner: ProductListener
    constructor(inner: ProductListener) {
        this.inner = inner;
    }

    onInitialized(success: boolean) {
        if (this.inner.onInitialized)
            this.inner.onInitialized(success)
    }

    onCanceled(p: Stencil.Purchasing.Product) {
        if (this.inner.onCanceled)
            this.inner.onCanceled(p)
    }

    onConsumed(p: Stencil.Purchasing.Product, error: string) {
        if (this.inner.onConsumed)
            this.inner.onConsumed(p, error)
    }

    onFailure(p: Stencil.Purchasing.Product, msg: string) {
        if (this.inner.onFailure)
            this.inner.onFailure(p, msg)
    }

    onProductRequestFailure(msg: string) {
        if (this.inner.onProductRequestFailure)
            this.inner.onProductRequestFailure(msg)
    }

    onProductRequestSuccess(products: Stencil.Purchasing.Product[]) {
        if (this.inner.onProductRequestSuccess)
            this.inner.onProductRequestSuccess(products)
    }

    onRestoreComplete(ok: boolean, msg: string) {
        if (this.inner.onRestoreComplete)
            this.inner.onRestoreComplete(ok, msg)
    }

    onRestored(p: Stencil.Purchasing.Product) {
        if (this.inner.onRestored)
            this.inner.onRestored(p)
    }

    onSuccess(p: Stencil.Purchasing.Product) {
        if (this.inner.onSuccess)
            this.inner.onSuccess(p)
    }
}
