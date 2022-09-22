import { FC } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

const CommonSsrWrapper: FC = ({ children }) => {
    return <BrowserOnly>{() => <>{children}</>}</BrowserOnly>;
};

export default CommonSsrWrapper;
