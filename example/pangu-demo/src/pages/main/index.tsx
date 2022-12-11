import './index.less';
import { useNavigate } from '@montagejs/pangu';
import { usePluginProvider } from '@montagejs/pangu-plugin-route-preload';

function Main() {
    const navigate = useNavigate();
    const store = usePluginProvider();

    const handleClick = () => {
        navigate('/about');
    };

    const handleOver = () => {
        // @ts-ignore
        store.get('/about')?.preload?.();
    };

    return (
        <div className="main-page">
            <h3>hello 欢迎使用ak，点击按钮跳转about页面</h3>
            <button onMouseOver={handleOver} onClick={handleClick}>
                点击跳转
            </button>
        </div>
    );
}
export default Main;
