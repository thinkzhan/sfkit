import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class Detail extends React.Component {
    render() {
        return (
            <div>
                <p>路由2</p>
                <Link to="/router">去路由1</Link>
            </div>
        );
    }
}
