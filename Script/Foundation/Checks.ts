
export function checkPresent(...values: any[]) {
    values.forEach(value => {
        if (value === null || value === undefined) {
            throw `Value must be present`
        }
    })
}