import '@waline/client/dist/waline.css';
import type { WalineInstance, WalineInitOptions } from "@waline/client";
export interface ReactWalineClientProps extends Omit<WalineInitOptions, "el"> {
    path?: string;
}
export declare type CRefProps = {
    update: WalineInstance['update'];
};
declare const ReactWalineClient: import("react").ForwardRefExoticComponent<ReactWalineClientProps & import("react").RefAttributes<CRefProps>>;
export default ReactWalineClient;
