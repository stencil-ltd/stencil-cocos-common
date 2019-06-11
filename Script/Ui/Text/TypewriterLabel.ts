import menu = cc._decorator.menu;
import requireComponent = cc._decorator.requireComponent;
import property = cc._decorator.property;
import PromiseWrapper from "../../Foundation/PromiseWrapper";
import RichText = cc.RichText;
import Label = cc.Label;

const {ccclass} = cc._decorator;

@ccclass
@requireComponent(Label)
@menu("Stencil/Text/TypewriterLabel")
export default class TypewriterLabel extends cc.Component {

    @property()
    speed: number = 5.0

    private _label: Label
    private _text: string = ""
    private _length: number = 0

    private _promise: PromiseWrapper<string>

    protected onLoad(): void {
        this._label = this.getComponent(Label)
        this.setText('')
    }

    protected update(dt: number): void {
        this._length += dt * this.speed
        this.refresh()
    }

    await(): Promise<string> {
        return this._promise.promise
    }

    setText(text: string): Promise<string> {
        console.log(`Typewriter: set text to ${text}`)
        if (this._promise && !this._promise.isFinished()) {
            this._promise.reject(text)
        }
        this._text = text
        this._length = 0
        this._promise = new PromiseWrapper<string>()
        return this.await()
    }

    private refresh() {
        this._label.string = this._text.substr(0, Math.floor(this._length)).padEnd(this._text.length, ' ')
        if (!this._promise.isFinished() && this._label.string == this._text) {
            this._promise.resolve(this._text)
        }
    }
}
