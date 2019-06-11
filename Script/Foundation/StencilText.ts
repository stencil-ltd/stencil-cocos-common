export default class StencilText {

    public static getIndicesOf(pattern: string, str: string, caseSensitive: boolean = true): number[] {
        const searchStrLen = pattern.length;
        if (searchStrLen == 0) {
            return [];
        }
        let startIndex = 0, index;
        const indices: number[] = [];
        if (!caseSensitive) {
            str = str.toLowerCase();
            pattern = pattern.toLowerCase();
        }
        while ((index = str.indexOf(pattern, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }
        return indices;
    }

}