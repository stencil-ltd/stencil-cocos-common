export default class StencilJs {

    public static loadScript(url: string): Promise<any> {
        console.log(`Attempt to load ${url}`)
        return new Promise((resolve) => {
            const head  = document.getElementsByTagName('head')[0]
            const scriptTag = document.createElement('script')
            scriptTag.onload = ev => {
                console.log(`Resolve ${url}`)
                resolve(null)
            }
            scriptTag.src = url
            head.appendChild(scriptTag)
        })
    }

    public static loadCSS(url: string): Promise<any> {
        console.log(`Attempt to load ${url}`)
        return new Promise((resolve) => {
            const head  = document.getElementsByTagName('head')[0]
            const link = document.createElement('link')
            link.onload = ev => {
                console.log(`Resolve ${url}`)
                resolve(null)
            }
            link.type = 'text/css'
            link.rel = 'stylesheet'
            link.href = url
            head.appendChild(link)
        })
    }

}

export function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
}

export function sleepSeconds(seconds: number): Promise<any> {
    return sleepMs(seconds * 1000)
}

export function sleepMs(ms: number): Promise<any> {
    console.log(`sleep ${ms}ms`)
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/
export function uuid() {
    const lut = [];
    for (let i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
    const d0 = Math.random() * 0xffffffff | 0;
    const d1 = Math.random() * 0xffffffff | 0;
    const d2 = Math.random() * 0xffffffff | 0;
    const d3 = Math.random() * 0xffffffff | 0;
    return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
        lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
        lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
        lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
}

/**
 * https://gist.github.com/penguinboy/762197#gistcomment-2773307
 */
export function flatten(objectOrArray, prefix = '', formatter = (k) => (k)): any {
    const nestedFormatter = (k) => ('.' + k)
    const nestElement = (prev, value, key) => (
        (value && typeof value === 'object')
            ? { ...prev, ...flatten(value, `${prefix}${formatter(key)}`, nestedFormatter) }
            : { ...prev, ...{ [`${prefix}${formatter(key)}`]: value } });
    return Array.isArray(objectOrArray)
        ? objectOrArray.reduce(nestElement, {})
        : Object.keys(objectOrArray).reduce(
            (prev, element) => nestElement(prev, objectOrArray[element], element),
            {},
        );
};