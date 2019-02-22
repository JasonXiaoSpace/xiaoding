import { Injectable } from '17zy_olympus-r/core/injector/Injector';
import { bridgeManager } from '17zy_olympus-r/engine/bridge/BridgeManager';
import { environment } from '17zy_olympus-r/engine/env/Environment';
import { core } from '17zy_olympus-r/Olympus';

/**
 * @author 肖建军
 * 屏幕日志
 */
@Injectable
export default class PrintUtil {
    private egretPrintLabel: eui.Label;
    private domPrintDiv: HTMLDivElement;
    private egretLogList: string[];
    private domLogList: string[];
    private MaxLogNum: number = 10;
    private MaxLetterPerRow: number = 40;

    public clearPrint(): void {
        if (bridgeManager.currentBridge.type === 'Egret') {
            if (this.egretLogList) {
                this.egretLogList = [];
            }
        } else {
            if (this.domLogList) {
                this.domLogList = [];
            }
        }
    }

    public print(log: string): void {
        if (
            environment.env === 'dev' ||
            environment.env === 'test' ||
            environment.env === 'staging'
        ) {
            if (bridgeManager.currentBridge.type === 'Egret') {
                if (!this.egretPrintLabel) {
                    this.egretPrintLabel = new eui.Label();
                    this.egretPrintLabel.textColor = 0xff0000;
                    this.egretPrintLabel.x = 10;
                    this.egretPrintLabel.y = 500;
                    bridgeManager.currentBridge.topLayer.addChild(this.egretPrintLabel);
                }
                if (!this.egretLogList) {
                    this.egretLogList = [];
                }
                // 50个字符一行
                const strLen: number = log.length;
                const quotient: number = Math.floor(log.length / this.MaxLetterPerRow);
                const remainder: number = Math.floor(log.length % this.MaxLetterPerRow);
                const rowNum: number = remainder === 0 ? quotient : quotient + 1;
                for (let i: number = 0; i < rowNum; i++) {
                    const one: string = log.slice(
                        i * this.MaxLetterPerRow,
                        (i + 1) * this.MaxLetterPerRow,
                    );
                    this.egretLogList.push(one);
                }
                const curLogNum: number = this.egretLogList.length;
                if (curLogNum > this.MaxLogNum) {
                    this.egretLogList.splice(0, this.egretLogList.length - this.MaxLogNum);
                }
                this.egretPrintLabel.text = this.egretLogList.join('\n');
            } else {
                if (!this.domPrintDiv) {
                    this.domPrintDiv = document.createElement('div');
                    this.domPrintDiv.id = 'print';
                    this.domPrintDiv.style.top = '80px';
                    this.domPrintDiv.style.left = '10px';
                    this.domPrintDiv.style.color = '#ff0000';
                    this.domPrintDiv.style.position = 'absolute';
                    this.domPrintDiv.style.zIndex = '1000';
                    this.domPrintDiv.style.fontSize = '4vw';
                    (bridgeManager.currentBridge.topLayer as HTMLElement).appendChild(
                        this.domPrintDiv,
                    );
                }
                if (!this.domLogList) {
                    this.domLogList = [];
                }
                this.domLogList.push(log);
                const curLogNum: number = this.domLogList.length;
                if (curLogNum > this.MaxLogNum) {
                    this.domLogList.splice(0, this.domLogList.length - this.MaxLogNum);
                }
                this.domPrintDiv.innerHTML = this.domLogList.join('</br>');
            }
        }
    }
}

/** 再额外导出一个单例 */
export const printUtil: PrintUtil = core.getInject(PrintUtil);
