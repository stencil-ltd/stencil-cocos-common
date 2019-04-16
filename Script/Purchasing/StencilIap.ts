import ProductListener = Stencil.Purchasing.ProductListener;

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
    }

}