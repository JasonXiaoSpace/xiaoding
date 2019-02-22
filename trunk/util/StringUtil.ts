import { core } from '17zy_olympus-r/core/Core';
import { Injectable } from '17zy_olympus-r/core/injector/Injector';

/**
 * @author 肖建军
 * 字符串工具
 */
@Injectable
export default class StringUtils {
    public formatStrLen(str: string, style: string, maxWidth: number): string {
        let result: string = '';
        const len: number = str.length;
        let curLen: number = 0;
        let curStr: string;
        let textWidth: number = 0;
        do {
            curLen++;
            curStr = str.slice(0, curLen);
            textWidth = this.getTextWidth(curStr, style);
        } while (textWidth <= maxWidth && curLen < len);
        if (curLen < len) {
            result = `${str.slice(0, curLen - 1)}...`;
        } else {
            result = str;
        }
        return result;
    }

    /**
     * 指定一个字符串的样式后，获取它的宽度
     * @param text 文本
     * @param font 样式 格式类似这样: "24pt Arial"
     * @author 肖建军
     */
    public getTextWidth(text: string, font: string): number {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    }

    /**
     * @param str 要切的字符串
     * @param len 想要留下的字符数量
     * @author 肖建军
     */
    public nameSubstr(value: string, len: number): string {
        let result: string;
        if (value.length > len) {
            result = `${value.substr(0, len)}...`;
        }
        return result;
    }

    /**
     * @param value 去掉字符串中间的空格
     * @author 肖建军
     */
    public trimMiddleSpace(value: string): string {
        let list: string[] = value.split('');
        let newList: string[] = list.filter((v: string) => {
            if (v !== ' ') {
                return true;
            }
        });
        let newStr: string = newList.join('');
        return newStr;
    }

    /**
     * 判断字符串是否符合JSON格式
     * @param str 目标字符串
     * @author yuan.ping
     */
    public isJSON(str: string): boolean {
        if (typeof str === 'string') {
            try {
                let obj = JSON.parse(str);
                return true;
            } catch (e) {
                return false;
            }
        }
        console.log('参数非字符串格式 <======== StringUtils.ts@isJSON');
    }
}

/** 再额外导出一个单例 */
export const stringUtils: StringUtils = core.getInject(StringUtils);
