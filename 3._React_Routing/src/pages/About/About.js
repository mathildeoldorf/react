import React, {Component} from "react";
// import PageContent from "../../components/About/AboutComponent";

export default class AboutPage extends Component{

    handleRedirect = () => {
        this.props.history.push("/");
    }

    render() {
        console.log('hello', this.props);
        // return(
        //     <PageContent />
            
        // );
        return(
            <div>
                <h1>About page</h1>
                <button onClick={this.handleRedirect}>Home</button>
            </div>
            
        );
    }
}
