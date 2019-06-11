export default class StencilEnum {

    public static numberValues<T>(en: any): T[] {
        return Object.keys(en)
            .filter(value => isNaN(Number(value)))
            .map(key => en[key]);
    }

}