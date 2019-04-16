import Singleton from "../../Lifecycle/Singleton";
import property = cc._decorator.property;
import Font = cc.Font;
import {StencilFont} from "./StencilFont";
import ccclass = cc._decorator.ccclass;
import menu = cc._decorator.menu;

@ccclass
@menu('Stencil/Text/Font Settings')
export default class StencilFonts extends Singleton {

    public static instance(): StencilFonts {
        return Singleton.get(StencilFonts);
    }

    @property(Font)
    public defaultFont: Font = null

    @property(Font)
    public headerFont: Font = null

    @property(Font)
    public detailFont: Font = null

    public getFont(font: StencilFont): Font {
        switch (font) {
            case StencilFont.Default:
                return this.defaultFont
            case StencilFont.Header:
                return this.headerFont
            case StencilFont.Detail:
                return this.detailFont
        }
    }

}