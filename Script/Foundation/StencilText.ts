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

    public static splitSentences(text: string, maxLength: number): string[] {
        if (!text) return []
        if (text.length <= maxLength) return [text]
        try {
            const sentences: string[] = text.match(/[^\.!\?]+[\.!\?]+/g);
            let split = sentences.halves(true)
            const first = split[0].join('')
            const second = split[1].join('')
            const final = [first, second]
            const retval: string[] = []
            final.forEach(value => {
                retval.push(...this.splitSentences(value, maxLength))
            })
            return retval.map(value => value.trim())
        } catch (e) {
            console.error(e)
            return [text]
        }
    }

}