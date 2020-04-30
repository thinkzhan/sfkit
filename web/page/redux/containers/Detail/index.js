import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class Detail extends React.Component {
    render() {
        return (
            <div className="detail">
                <a className="logo"></a>
                <Link to="/redux">去redux路由1</Link>
            </div>
        );
    }
}
