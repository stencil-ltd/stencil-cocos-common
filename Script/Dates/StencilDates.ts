import moment = require("moment");

export default class StencilDates {

    private static _inject: Date|null = null

    public static inject(date: Date|null) {
        console.warn(`\tInjecting Date: ${date}`)
        this._inject = date
    }

    public static date(): Date {
        return this._inject || new Date()
    }

    public static sameDay(d1: Date, d2: Date): boolean {
        if (!d1 || !d2) return false
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    }

    public static daysBetween(d1: Date, d2: Date): number {
        const m1 = moment(d1)
        const m2 = moment(d2)
        return m1.diff(m2, 'days')
    }

    public static dayFormat(d: Date): string {
        return moment(d).format('YYYYMMDD')
    }

    public static fromDayFormat(fmt: string|null): Date|null {
        if (!fmt) return null
        const m = moment(fmt, 'YYYYMMDD')
        return m.toDate()
    }

    public static hhmmssFormatDate(d: Date): string {
        return `${d.getHours()}`.padStart(2, '0') + ':'
            + `${d.getMinutes()}`.padStart(2, '0') + ':'
            + `${d.getSeconds()}`.padStart(2, '0')
    }

    public static hhmmssFormatTime(ms: number): string {
        const sec_num = Math.floor(ms / 1000)
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        const seconds = sec_num - (hours * 3600) - (minutes * 60);
        return `${hours}`.padStart(2, '0') + ':'
            + `${minutes}`.padStart(2, '0') + ':'
            + `${seconds}`.padStart(2, '0')
    }
}