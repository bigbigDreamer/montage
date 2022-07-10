import { useEffect, useRef, useImperativeHandle, forwardRef, CSSProperties } from 'react';
import { init } from '@waline/client';
import classes from 'classnames';

import '@waline/client/dist/waline.css';

import './index.less';

import type { WalineInstance, WalineInitOptions } from '@waline/client';

export interface ReactWalineClientProps extends Omit<WalineInitOptions, 'el'> {
    path?: string;
    className?: string;
    style?: CSSProperties;
}

export type CRefProps = {
    /* update waline instance props */
    update: WalineInstance['update'];
};

const ReactWalineClient = forwardRef<CRefProps, ReactWalineClientProps>(
    ({ className, style, ...props }, ref) => {
        const walineInstanceRef = useRef<Partial<WalineInstance>>({});
        const containerRef = useRef<HTMLDivElement | null>(null);

        const containerCls = classes('montage-react-waline-client_container');

        useEffect(() => {
            walineInstanceRef.current = init({
                ...props,
                el: containerRef.current,
            })!;

            return () => walineInstanceRef.current?.destroy?.();
        }, []);

        useImperativeHandle(ref, () => ({
            update: (props) => walineInstanceRef.current?.update?.({ ...props }),
        }));

        return <div ref={containerRef} className={containerCls} style={style} />;
    },
);

export default ReactWalineClient;
