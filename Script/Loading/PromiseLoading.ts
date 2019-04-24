import error = cc.error;

export default class PromiseLoading {

    public static loadSingle(url: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            cc.loader.load(url, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }

    public static loadMulti(urls: string[], all: boolean = false): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            cc.loader.load(urls, (errors, results) => {
                if (errors) {
                    for (let i = 0; i < errors.length; i++) {
                        console.error('Error url [' + errors[i] + ']: ' + results.getError(errors[i]));
                    }
                    if (all || errors.length == urls.length) {
                        reject('Multiple Errors')
                        return
                    }
                }
                const retval = []
                for (const res in Object.values(results.completed)) {
                    retval.push(res)
                }
                resolve(retval)
            })
        })
    }

}