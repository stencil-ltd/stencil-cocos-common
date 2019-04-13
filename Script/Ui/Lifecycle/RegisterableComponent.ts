import value = cc.js.value;

export abstract class RegisterableComponent extends cc.Component {

    public isRegistered: boolean = false

    public onRegister() {
        this.isRegistered = true
    }
    public didRegister() {}

    public onUnregister() {
        this.isRegistered = false
    }

    protected onDestroy(): void {
        if (this.isRegistered) this.onUnregister()
    }
}