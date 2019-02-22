import { Injectable } from '17zy_olympus-r/core/injector/Injector';
import { core } from '17zy_olympus-r/Olympus';

@Injectable
export default class DateUtil {
    /**
     * 将时间对象转换成其他格式的字符串
     *
     * @example
     * // 18年12月28日 17:48:17
     * getFormattedDate(new Date(), 'yy年MM月dd日 hh:mm:ss')
     *
     * @param {Date} tempDate 时间对象
     * @param {string} format 其他格式字符串
     * @returns {string} 格式化字符串
     */
    public getFormattedDate(tempDate: Date, format: string): string {
        const o: any = {
            'M+': tempDate.getMonth() + 1, // month
            'd+': tempDate.getDate(), // day
            'h+': tempDate.getHours(), // hour
            'm+': tempDate.getMinutes(), // minute
            's+': tempDate.getSeconds(), // second
            'q+': Math.floor((tempDate.getMonth() + 3) / 3), // quarter
            'S+': tempDate.getMilliseconds(), // millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(
                RegExp.$1,
                (tempDate.getFullYear() + '').substr(4 - RegExp.$1.length),
            );
        }
        for (const k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
                );
            }
        }

        return format;
    }

    /**
     * 将时间戳转换成其他格式的字符串
     * @example
     *  getFormattedTimestamp(400000, 'mm:ss') // 06:40
     *
     * @param {number} timestamp 时间戳
     * @param {string} format 格式化字符串
     * @returns {string} 格式化字符串
     */
    public getFormattedTimestamp(timestamp: number, format: string): string {
        const o: any = {
            'd+': Math.floor(timestamp / 86400000),
            'h+': Math.floor(timestamp / 3600000) % 24,
            'm+': Math.floor(timestamp / 60000) % 60,
            's+': Math.floor(timestamp / 1000) % 60,
            'S+': timestamp % 1000,
        };
        for (const k in o) {
            if (o.hasOwnProperty(k)) {
                const reg: RegExp = new RegExp(k);
                const res: RegExpExecArray = reg.exec(format);
                if (res != null) {
                    const len: number = res[0].length;
                    const value: string = this.toLengthString(o[k], len);
                    format = format.substr(0, res.index) + value + format.substr(res.index + len);
                }
            }
        }
        return format;
    }

    private toLengthString(num: number, length: number): string {
        const numStr: string = num.toString();
        let index: number = numStr.indexOf('.');
        if (index < 0) {
            index = numStr.length;
        }
        let int: string = numStr.substr(0, index);
        const frac: string = numStr.substr(index);
        for (let i: number = int.length; i < length; i++) {
            int = '0' + int;
        }
        return int + frac;
    }
}

/** 再额外导出一个单例 */
export const dateUtil: DateUtil = core.getInject(DateUtil);
