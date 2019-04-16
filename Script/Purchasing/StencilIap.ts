export class StencilIap {

    public static json = "{\n" +
        "    \"android\": {\n" +
        "        \"iap\": {\n" +
        "            \"items\": {\n" +
        "                \"coin_package2\": {\n" +
        "                    \"id\": \"com.cocos2dx.plugintest3\"\n" +
        "                }, \n" +
        "                \"remove_ads\": {\n" +
        "                    \"type\": \"non_consumable\", \n" +
        "                    \"id\": \"com.cocos2dx.non1\"\n" +
        "                }, \n" +
        "                \"double_coin\": {\n" +
        "                    \"type\": \"non_consumable\", \n" +
        "                    \"id\": \"com.cocos2dx.non2\"\n" +
        "                }, \n" +
        "                \"coin_package\": {\n" +
        "                    \"id\": \"com.cocos2dx.plugintest2\"\n" +
        "                }, \n" +
        "                \"subs\": {\n" +
        "                    \"type\": \"subs\", \n" +
        "                    \"id\": \"subscription1\"\n" +
        "                }\n" +
        "            }, \n" +
        "            \"key\": \"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq7eIGu7dRcBRBSC05cYvxjBMd7cqq9w6++1er+cqO2tyWPtWB4vuTkliq4k/Fkylx5UMfptdOYOW8ENgQyVucs/NyuOAGmve4j5JFhLPcLa6LjO2HUSY6zk04DRR9Zw7YPET4WAezZTz8jYMGhPG08HYltVj8cmSpSFWd1nI0pGOJoLQIMkIkXplgnPQRbMpuOu70vnQQBS1RFcoFT7OjaV8U0cfJzMoS1TMkGqaJKks2T+qOBNTtkXzge92EnvYIkhpCfN98dj6aQmETNp5yj5Fa+jcbAVF8dy5xymJwioL89XQKfKkGR+P6ESMoBEPfIZYIlMU8EUwmC+UKGLujQIDAQAB\"\n" +
        "        }\n" +
        "    }, \n" +
        "    \"ios\": {\n" +
        "        \"iap\": {\n" +
        "            \"items\": {\n" +
        "                \"remove_ads\": {\n" +
        "                    \"type\": \"non_consumable\", \n" +
        "                    \"id\": \"com.cocos2dx.non1\"\n" +
        "                }, \n" +
        "                \"double_coin\": {\n" +
        "                    \"type\": \"non_consumable\", \n" +
        "                    \"id\": \"com.cocos2dx.non2\"\n" +
        "                }, \n" +
        "                \"coin_package\": {\n" +
        "                    \"id\": \"com.cocos2dx.plugintest2\"\n" +
        "                }, \n" +
        "                \"coin_package2\": {\n" +
        "                    \"id\": \"com.cocos2dx.plugintest3\"\n" +
        "                }\n" +
        "            }\n" +
        "        }\n" +
        "    }\n" +
        "}"

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

    public static init(): boolean {
        console.log(`StencilIap Init`)
        if (!this.isAvailable()) {
            console.log(`StencilIap Not Available`)
            return false
        }
        console.log(`StencilIap Set Listener`)
        sdkbox.IAP.setListener({
            onInitialized(success: boolean) {
                console.log(`IAP init: ${success}`)
            }
        })

        // const config = JSON.parse(this.json)
        // console.log(`StencilIap attempt parse config: ${JSON.stringify(config)}`)
        // @ts-ignore
        sdkbox.IAP.init()
        console.log(`StencilIap configured.`)
    }

}