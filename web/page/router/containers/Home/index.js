import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <p>路由1</p>
                <Link to="/router/detail">去路由2</Link>
            </div>
        );
    }
}
