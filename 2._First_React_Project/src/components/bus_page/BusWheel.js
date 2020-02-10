import React, {Component} from 'react';

export default class BusWheel extends Component{
    render(){

        const {number, direction} = this.props.wheel;

        return(
            <div>
                <h2>Wheel {number}</h2>
                <p>I am situated in the {direction}</p>
            </div>
        )
    }
}