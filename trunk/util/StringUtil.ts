import { core } from '17zy_olympus-r/core/Core';
import { Injectable } from '17zy_olympus-r/core/injector/Injector';

/**
 * @author Ф����
 * �ַ�������
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
     * ָ��һ���ַ�������ʽ�󣬻�ȡ���Ŀ��
     * @param text �ı�
     * @param font ��ʽ ��ʽ��������: "24pt Arial"
     * @author Ф����
     */
    public getTextWidth(text: string, font: string): number {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    }

    /**
     * @param str Ҫ�е��ַ���
     * @param len ��Ҫ���µ��ַ�����
     * @author Ф����
     */
    public nameSubstr(value: string, len: number): string {
        let result: string;
        if (value.length > len) {
            result = `${value.substr(0, len)}...`;
        }
        return result;
    }

    /**
     * @param value ȥ���ַ����м�Ŀո�
     * @author Ф����
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
     * �ж��ַ����Ƿ����JSON��ʽ
     * @param str Ŀ���ַ���
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
        console.log('�������ַ�����ʽ <======== StringUtils.ts@isJSON');
    }
}

/** �ٶ��⵼��һ������ */
export const stringUtils: StringUtils = core.getInject(StringUtils);
