import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './containers';

async function render() {
    const content = renderToString(<App/>);

    const assets = require('Public/assets.json');

    return {
        content,
        state: {},
        assets
    };
}

export default render;
