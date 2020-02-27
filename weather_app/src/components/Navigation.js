import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navigation extends Component{
    render(){
        return(
            <nav>
                <ul>
                    <li>
                    <Link to="/">Front page</Link>
                    </li>
                    <li>
                    <Link to="/forecast">Forecast page</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}