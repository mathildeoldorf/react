import React, {Component} from 'react';

export default class ThemePage extends Component{ // inheritance - in the constructor we inherit the functions from the super class 
    // constructor(props){ // only called once
    //     super(props); // initializing the 
    //     this.
        
        state = {
            color: undefined
        };
    // }

    handleSendColorToParent = () => {
        const color = this.state.color;
        console.log(this.props.callbackFromParent);

        this.props.propsFromParent(color);
    }


    render() { // called everytime it renders
        console.log('theme', this.props);

        

        return(
            // <h1>Theme page</h1>
            <div>
                <input type="color" onChange={(event) => this.setState({color: event.target.value})}/>

                {/* <button onClick={() => console.log(this.state.color)}></button> */}
                <button onClick={() => this.handleSendColorToParent()}></button>
            </div>
        );
    }
}

// callbackFromParent