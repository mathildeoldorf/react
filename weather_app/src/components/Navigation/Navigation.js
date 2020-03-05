import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Search from './../Search/Search';

import {FaCloudSunRain as Logo} from 'react-icons/fa';

export default class Navigation extends Component{
    render(){
        return(
            <nav className="Navigation">
                <header className="App-header">
                <Link to="/"><h1>In Rain or Shine <Logo/></h1></Link>
                </header>
                <ul>
                    <li>
                    <Link to="/">Current Weather</Link>
                    </li>
                    <li>
                    <Link to="/forecast">5-day Forecast</Link>
                    </li>
                    <li>
                    < Search parentCallbackSearchData = {this.handleCallbackFunctionSearchData}/>
                    </li>
                </ul>
            </nav>
        );
    }
}