import Home from './containers/Home';
import Detail from './containers/Detail';

export default [
    {
        path: '/redux',
        component: Home,
        loadData: Home.loadData,
        exact: true,
    },
    {
        path: '/redux/detail',
        component: Detail,
        loadData: Detail.loadData,
        exact: true,
    },
];
