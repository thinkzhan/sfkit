
import React from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

import routes from '../routes';

class Container extends React.Component {
    render() {
        return (
            <div id="container">
                { renderRoutes(routes) }
            </div>
        );
    }
}

export default withRouter(Container);
