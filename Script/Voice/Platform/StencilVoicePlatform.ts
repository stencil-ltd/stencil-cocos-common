export default interface StencilVoicePlatform {
    init()
    isReady(): boolean
    startListening()
    stopListening()
    destroy()
}