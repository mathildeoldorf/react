import React, {Component} from 'react';

export default class Profile extends Component{
    render(){

        // object destructuring assignment
        const {name, hobby} = this.props.profile; // take them out of probs and define them in the local scope

        return(
            <div>
                <div>
                    <h3>Profile</h3>
                    <p>Hello {name}</p>
                    <p>Your hobby is {hobby}</p>
                </div>
            </div>
            
        );
    }
}