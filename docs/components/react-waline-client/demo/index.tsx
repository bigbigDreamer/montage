import Waline, { CRefProps } from "@montagejs/react-waline-client";
import { FC, useRef } from "react";
import { Button } from "antd";

const WalineDemo: FC = () => {

    const ref = useRef<CRefProps>(null);

    const handleChange = () => {
        ref.current?.update({
            comment: true
        })
    }

    return (
        <>
            <Waline ref={ref} serverURL="https://waline.bigdreamer.cc" />
            <Button onClick={handleChange}>更新配置</Button>
        </>
    )
};

export default WalineDemo;
