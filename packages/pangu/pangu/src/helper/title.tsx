import {FC, useEffect} from "react";

type TitleProps = {
    title?: string;
}

const Title: FC<TitleProps> = ({ children, title }) => {

    useEffect(() => {
        title && (document.title = title);
    }, [title])

    return <>
        {children}
    </>
}

export  default Title;
