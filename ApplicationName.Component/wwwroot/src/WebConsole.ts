
export class WebConsole {
    static log(...data: any[]): void {
        console.log(...data);
    }
    static info(...data: any[]): void {
        console.info(...data);
    }
    static warn(...data: any[]): void {
        console.warn(...data);
    }
    static error(...data: any[]): void {
        console.error(...data);
    }
}
