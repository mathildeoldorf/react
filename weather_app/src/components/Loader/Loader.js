import React, { Component } from "react";

import {BounceLoader} from 'react-spinners';
import './Loader.css';

export default class Loader extends Component {

    state = {
        isLoading: true
    };

    render(){
        return(
            <div className="Loader-wrapper">
            <BounceLoader color={'white'} loading={this.state.isLoading} className="Loader" />
            </div>
        );
    }
}