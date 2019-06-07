export default class StencilNative {

    public static callIos(className: string,
                           methodName: string,
                           ...parameters: any[])
    {
        console.log(`StencilNative: ${className}.${methodName} -> [${parameters.join(', ')}]`)
        return jsb.reflection.callStaticMethod(className, methodName, ...parameters)
    }

    public static callJava(className: string,
                       methodName: string,
                       methodSignature: string,
                       ...parameters: any[])
    {
        console.log(`StencilNative: ${className}.${methodName}${methodSignature} -> [${parameters.join(', ')}]`)
        return jsb.reflection.callStaticMethod(className, methodName, methodSignature, ...parameters)
    }

}