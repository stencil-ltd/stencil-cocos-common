export abstract class RegisterableComponent extends cc.Component {

    public isRegistered: boolean = false
    public isUnregistered: boolean = false

    public onRegister() {}
    public didRegister() {}
    public willUnregister() {}
    public didUnregister() {}
}