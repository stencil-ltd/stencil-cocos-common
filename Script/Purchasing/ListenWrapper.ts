import {Stencil} from "./SdkBoxIap";
import ProductListener = Stencil.Purchasing.ProductListener;
import Product = Stencil.Purchasing.Product;

export class ListenWrapper implements ProductListener {

    private readonly inner: ProductListener[] = []

    public addListener(listener: ProductListener) {
        this.inner.push(listener)
    }

    public removeListener(listener: ProductListener) {
        this.inner.splice(this.inner.indexOf(listener), 1)
    }

    onInitialized(success: boolean) {
        this.inner.forEach(value => {
            if (value.onInitialized) 
                value.onInitialized(success)
        })
    }

    onCanceled(p: Product) {
        this.inner.forEach(value => {
            if (value.onCanceled)
                value.onCanceled(p)  
        })
    }

    onConsumed(p: Product, error: string) {
        this.inner.forEach(value => {
            if (value.onConsumed)
                value.onConsumed(p, error)
        })
    }

    onFailure(p: Product, msg: string) {
        this.inner.forEach(value => {
            if (value.onFailure)
                value.onFailure(p, msg)
        })
    }

    onProductRequestFailure(msg: string) {
        this.inner.forEach(value => {
            if (value.onProductRequestFailure)
                value.onProductRequestFailure(msg)
        })        
    }

    onProductRequestSuccess(products: Product[]) {
        this.inner.forEach(value => {
            if (value.onProductRequestSuccess)
                value.onProductRequestSuccess(products)
        })        
    }

    onRestoreComplete(ok: boolean, msg: string) {
        this.inner.forEach(value => {
            if (value.onRestoreComplete)
                value.onRestoreComplete(ok, msg)
        })
    }

    onRestored(p: Product) {
        this.inner.forEach(value => {
            if (value.onRestored)
                value.onRestored(p)
        })
    }

    onSuccess(p: Product) {
        this.inner.forEach(value => {
            if (value.onSuccess)
                value.onSuccess(p)
        })
    }
}