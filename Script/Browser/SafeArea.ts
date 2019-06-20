import Rect = cc.Rect;
import screen = cc.screen;

export default class SafeArea {

    /**
     * Thanks QuirksMode!
     * https://www.quirksmode.org/blog/archives/2017/10/safeareainset_v.html
     */
    public static getSafeArea(): Rect {
        let x = 0
        let y = 0
        let width = cc.view.getFrameSize().width
        let height = cc.view.getFrameSize().height
        if (CSS.supports('padding-left: constant(safe-area-inset-left)')) {
            const div = document.createElement('div')
            document.body.appendChild(div)
            div.style.paddingTop = 'constant(safe-area-inset-top)'
            div.style.paddingBottom = 'constant(safe-area-inset-bottom)'
            div.style.paddingLeft = 'constant(safe-area-inset-left)'
            div.style.paddingRight = 'constant(safe-area-inset-right)'
            const style = window.getComputedStyle(div)
            x = parseInt(style.paddingLeft)
            y = parseInt(style.paddingBottom)
            width = width - x - parseInt(style.paddingRight)
            height = height - y - parseInt(style.paddingTop)
            document.body.removeChild(div)
        }
        return new Rect(x, y, width, height)
    }

}