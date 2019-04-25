export default class StencilAudio {

    public static async stream(url: string) {
        console.log(`Attempt stream: ${url}`)
        const audio = document.createElement('audio')
        audio.src = url
        const retval = audio.play()
        await retval
        console.log(`Finished stream: ${url}`)
        // audio.parentElement.removeChild(audio)
        return retval
    }
}