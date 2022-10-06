import './index.less';
import { useNavigate } from '@montagejs/pangu';

function Main() {
    const navigate = useNavigate();

    return (
        <div className="main-page">
            <h3>hello 欢迎使用ak，点击按钮跳转about页面</h3>
            <button onClick={() => navigate('/about')}>点击跳转</button>
        </div>
    );
}
export default Main;
