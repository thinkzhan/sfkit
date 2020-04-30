import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import Container from './containers';
import serverStore from './store/store';
import routes from './routes';

async function render(ctx) {
    const { req, path } = ctx;

    const matchedRoutes = matchRoutes(routes, path);
    const promises = [];
    for (const item of matchedRoutes) {
        if (item.route.loadData) {
            const promise = new Promise((resolve, reject) => {
                item.route.loadData(serverStore).then(resolve).catch(resolve);
            });
            promises.push(promise);
        }
    }
    await Promise.all(promises).catch((err) => {
        console.log(err);
    });

    const App = () =>
        <Provider store={serverStore}>
            <StaticRouter
                location={req.url}
            >
                <Container />
            </StaticRouter>
        </Provider>
    ;
    const content = renderToString(<App />);
    const state = JSON.stringify(serverStore.getState());

    return {
        content,
        state
    };
}

export default render;
