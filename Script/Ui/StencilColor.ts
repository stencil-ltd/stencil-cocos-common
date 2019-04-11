import Color = cc.Color;

export default class StencilColor {

    public static hexToRgb(hex: string): Color {
        const bigint = parseInt(hex.substr(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return cc.color(r, g, b)
    }
}