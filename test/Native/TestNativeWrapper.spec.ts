import {assert} from "chai";
import {NativeMethod, NativeType} from "../../Script/Native/NativeWrapper";

describe('Test Native Wrapper', () => {

    it('empty methods android', () => {
        const method = new NativeMethod('ltd.stencil.Foo', 'bar')
        assert.equal(method._androidClass(), 'ltd/stencil/Foo')
        assert.equal(method._androidSignature(), '()V')
    })

    it('signature android', () => {
        const method = new NativeMethod('ltd.stencil.Foo', 'bar')
            .addArg('boolean', NativeType.Boolean)
            .addArg('str', NativeType.String)
            .returns(NativeType.Boolean)
        assert.equal(method._androidSignature(), '(Z;Ljava/lang/String)Z')
    })

    it('empty methods ios', () => {
        const method = new NativeMethod('Foo', 'bar')
        assert.equal(method._iosName(), 'bar')
    })

    it('name single ios', () => {
        const method = new NativeMethod('Foo', 'bar')
            .addArg('str', NativeType.String)
        assert.equal(method._iosName(), 'barWithStr:')
    })

    it('name two ios', () => {
        const method = new NativeMethod('Foo', 'bar')
            .addArg('boolean', NativeType.Boolean)
            .addArg('str', NativeType.String)
        assert.equal(method._iosName(), 'barWithBoolean:str:')
    })
})