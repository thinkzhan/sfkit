import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <p>redux路由1</p>
                <Link to="/redux/detail">去redux路由2</Link>
            </div>
        );
    }
}
