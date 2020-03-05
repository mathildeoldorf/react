import React, {Component} from "react";

export default class Form extends Component{

    state ={
        firstName : undefined,
        lastName : undefined
    }

    handleInputChange = (event) => {
        this.setState({[event.target.id]: event.target.value});

    }

    onFormSubmit = () => {
        const { firstName, lastName } = this.state; // accessing it from state 
        this.props.propsFromForm(firstName, lastName); // passing them as props

        this.props.history.push("/");
    }

    render(){

        return(
            <div>
            <h1>Form</h1>
                <input type="text" id="firstName" placeholder="First name" onChange={this.handleInputChange} />
                <input type="text" id="lastName" placeholder="Last name" onChange={this.handleInputChange} />
                <button type="submit" onClick={this.onFormSubmit}>Submit</button>
            </div>
        );
    };
}
