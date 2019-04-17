import {Stencil} from "./SdkBoxIap";
import ProductListener = Stencil.Purchasing.ProductListener;
import Product = Stencil.Purchasing.Product;

class ListenWrapper implements ProductListener {

    private readonly inner: ProductListener

    constructor(inner: ProductListener) {
        this.inner = inner;
    }

    onInitialized(success: boolean) {
        if (this.inner.onInitialized)
            this.inner.onInitialized(success)
    }

    onCanceled(p: Product) {
        if (this.inner.onCanceled)
            this.inner.onCanceled(p)
    }

    onConsumed(p: Product, error: string) {
        if (this.inner.onConsumed)
            this.inner.onConsumed(p, error)
    }

    onFailure(p: Product, msg: string) {
        if (this.inner.onFailure)
            this.inner.onFailure(p, msg)
    }

    onProductRequestFailure(msg: string) {
        if (this.inner.onProductRequestFailure)
            this.inner.onProductRequestFailure(msg)
    }

    onProductRequestSuccess(products: Product[]) {
        if (this.inner.onProductRequestSuccess)
            this.inner.onProductRequestSuccess(products)
    }

    onRestoreComplete(ok: boolean, msg: string) {
        if (this.inner.onRestoreComplete)
            this.inner.onRestoreComplete(ok, msg)
    }

    onRestored(p: Product) {
        if (this.inner.onRestored)
            this.inner.onRestored(p)
    }

    onSuccess(p: Product) {
        if (this.inner.onSuccess)
            this.inner.onSuccess(p)
    }
}