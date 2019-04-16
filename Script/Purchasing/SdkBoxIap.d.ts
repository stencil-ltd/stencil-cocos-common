/**
 * Quick wrapper for the incomplete typings in:
 * {@link sdkbox.IAPListener}
 */
namespace Stencil.Purchasing {

    /**
     * Represents a product listing.
     */
    export interface Product {
        id: string
        name: string
        title: string
        description: string
        price: string
        priceValue: number
        currencyCode: string
        transactionID: string
        receipt: string
        receiptCipheredPayload: string
    }

    /**
     * Represents a single listener for all purchase events
     * emitted by the SDKBox IAP system.
     */
    export interface ProductListener {

        /**
         * Called when IAP initialized
         */
        onInitialized (success : boolean)

        /**
         * Called when an IAP processed successfully
         */
        onSuccess? (p : Product)

        /**
         * Called when an IAP fails
         */
        onFailure? (p : Product, msg : string)

        /**
         * Called when user canceled the IAP
         */
        onCanceled? (p : Product)

        /**
         * Called when server returns the IAP items user already purchased
         * @note this callback will be called multiple times if there are multiple IAP
         */
        onRestored? (p : Product)

        /**
         * Called the product request is successful, usually developers use product request to update the latest info(title, price) from IAP
         */
        onProductRequestSuccess? (products : Product[])

        /**
         * Called when the product request fails
         */
        onProductRequestFailure? (msg : string)

        /**
         * Called when the restore completed
         */
        onRestoreComplete? (ok : boolean , msg : string)

        /**
         * Called when consume completed, just trigger on android
         */
        onConsumed? (p : Product , error : string)
    }

}