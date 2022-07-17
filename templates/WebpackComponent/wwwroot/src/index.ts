import "./index.scss"
import { WebConsole } from "./component/WebConsole"

declare global {
    interface Window {
        Introp: any;
    }
} 
window.Introp = {
    WebConsole
}

export default WebConsole;