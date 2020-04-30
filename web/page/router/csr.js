import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './store/store';
import Container from './containers';

const App = () =>
    <AppContainer>
        <Provider store={store}>
            <BrowserRouter>
                <Container />
            </BrowserRouter>
        </Provider>
    </AppContainer>
;
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(<App />, document.getElementById('root'));

