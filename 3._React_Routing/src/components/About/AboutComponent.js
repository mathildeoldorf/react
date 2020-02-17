import React, {Component} from "react";

export default class TwoPageContent extends Component{

    handleRedirect = () => {
        this.props.history.push("/");
    }

    render() {
        return(
            <div>
                <h1>About page</h1>
                <button onClick={this.handleRedirect}>Home</button>
            </div>
            
        );
    }
}