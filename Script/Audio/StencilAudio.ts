import sys = cc.sys;
import AudioClip = cc.AudioClip;
import debug = cc.debug;

/**
 * None of this seems to work,
 * but I'm leaving it around in the hopes that I eventually fix it.
 */
export default class StencilAudio {

    public static async stream(url: string) {
        try {
            let audio = new Audio(url)
            console.log(`Created Audio: ${audio.constructor.name}`)
            // document.body.appendChild(audio)
            // audio = document.getElementById('stencil-audio')
            audio.load()
            const retval = audio.play()
            console.log(`Begin stream: ${url}`)
            await retval
            console.log(`Finished stream: ${url}`)
            // audio.parentElement.removeChild(audio)
            return retval
        } catch (e) {
            console.error(`Audio: ${e}`)
        }
    }

    public static async stream2(url: string) {

    }
}

// @ts-ignore
var __audioSupport = sys.__audioSupport;
var formatSupport = __audioSupport.format;
var context = __audioSupport.context;

export function loadDomAudio (url, callback) {
    try {
    console.log(`DOM: LOAD ${url}`)
    var dom = document.createElement('audio');
    dom.src = url;

    var clearEvent = function () {
        clearTimeout(timer);
        dom.removeEventListener("canplaythrough", success, false);
        dom.removeEventListener("error", failure, false);
    };
    var timer = setTimeout(function () {
        if (dom.readyState === 0)
            failure();
        else
            success();
    }, 8000);
    var success = function () {
        clearEvent();
        callback(null, dom);
    };
    var failure = function () {
        clearEvent();
        var message = 'load audio failure - ' + url;
        cc.log(message);
        callback(message);
    };

    console.log(`DOM: ADD LISTENER`)
    dom.addEventListener("canplaythrough", success, false);
    dom.addEventListener("error", failure, false);

    console.log(`DOM: CONFIGURED`)
    } catch (e) {
        console.error(`DOM: ${e}`)
    }
}

export function loadWebAudio (url, callback) {
    try {
    console.log(`WEB: LOAD ${url}`)
    if (!context)
        callback(new Error(debug.getError(4926)));

    var request = cc.loader.getXMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    // Our asynchronous callback
    request.onload = function () {
        context["decodeAudioData"](request.response, function(buffer){
            //success
            callback(null, buffer);
        }, function(){
            //error
            callback('decode error - ' + url, null);
        });
    };

    request.onerror = function(){
        callback('request error - ' + url, null);
    };

    console.log(`WEB: ADD LISTENER`)
    request.send();
    console.log(`WEB: CONFIGURED`)
    } catch (e) {
        console.error(`WEB: ${e}`)
    }
}