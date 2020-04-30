import Home from './containers/Home';
import Detail from './containers/Detail';

export default [
    {
        path: '/router',
        component: Home,
        loadData: Home.loadData,
        exact: true,

    },
    {
        path: '/router/detail',
        component: Detail,
        loadData: Detail.loadData,
        exact: true,
    }

];
