import PanGu from '@montagejs/pangu';
import RouterConfig from './config/router.config';

const app = new PanGu({
    routes: RouterConfig,
});

app.start();
