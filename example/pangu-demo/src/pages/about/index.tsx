import './index.less';
import { usePluginProvider } from '@montagejs/pangu-plugin-route-preload';

function About() {
    const store = usePluginProvider();

    console.log(store, '--');
    return (
        <div className="about-page">
            <h3>about page</h3>
            <a href="https://github.com/myNameIsDu/aktiv">查看文档</a>
        </div>
    );
}

export default About;
