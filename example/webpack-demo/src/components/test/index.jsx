// import './test.css';
import ReactWalineClient from '@montagejs/react-waline-client';
import '@montagejs/react-waline-client/dist/style/index.css';

export default function Test() {
    return (
        <>
            <div>Hello world sss</div>
            <br />
            <ReactWalineClient serverURL={'https://waline.bigdreamer.cc'} />
        </>
    );
}
