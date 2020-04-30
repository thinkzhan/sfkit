import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Container from './containers';

const App = () =>
    <AppContainer>
        <Container />
    </AppContainer>
;
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(<App />, document.getElementById('root'));

