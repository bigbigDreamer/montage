import './index.less';
import { useNavigate, useOutlet } from '@montagejs/pangu';
import { usePluginProvider } from '@montagejs/pangu-plugin-route-preload';

function Main() {
    const navigate = useNavigate();
    const store = usePluginProvider();
    const outlet = useOutlet();

    const handleClick = () => {
        navigate('/about');
    };
    const handleChildClick = () => {
        navigate('/inner');
    };

    const handleOver = () => {
        // @ts-ignore
        store.get('/about')?.preload?.();
    };

    return (
        <div className="main-page">
            <h3>hello 欢迎使用ak，点击按钮跳转about页面</h3>
            {outlet}
            <button onMouseOver={handleOver} onClick={handleClick}>
                点击跳转
            </button>
            <button onClick={handleChildClick}>点击跳转子陆游</button>
        </div>
    );
}
export default Main;
