/**
 * Quick wrapper for the incomplete typings in:
 * {@link sdkbox.IAPListener}
 */
export namespace Stencil {

    export namespace Purchasing {

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

            // These fields seem to only be for purchased stuff. Probably non-consumable and subscriptions.
            transactionID?: string
            receipt?: string
            receiptCipheredPayload?: string
        }

        /**
         * Represents a single listener for all purchase events
         * emitted by the SDKBox IAP system.
         */
        export interface ProductListener {

            /**
             * Called when IAP initialized
             */
            onInitialized? (success : boolean)

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

        export enum IapPlatform {
            ios = "ios",
            android = "android"
        }

        export enum IapType {
            non_consumable = "non_consumable",
            subs = "subs"
        }

        /**
         * If you want to load the config for mock testing in browser, this could be helpful.
         */
        export interface IapConfig {
            android: { iap: IapConfigPlatform }
            ios: { iap: IapConfigPlatform }
        }

        export interface IapConfigItem {
            id: string
            type?: IapType

            // All of these are just used for simulator faking.
            // They will be discarded on native platforms.
            price?: string
            priceValue?: number
            title?: string
            description?: string
        }

        export interface IapConfigPlatform {
            key: string
            items: { [s: string]: IapConfigItem }
        }
    }
}