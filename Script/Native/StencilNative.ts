export default class StencilNative {

    public static call(className: string,
                       methodName: string,
                       methodSignature: string,
                       ...parameters: any[])
    {
        return jsb.reflection.callStaticMethod(className, methodName, methodSignature, ...parameters)
    }

}