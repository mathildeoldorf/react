import React, {Component} from "react";
import "./Button.css";

export default class ButtonWithChildren extends Component{
    render() {
        console.log("where are the children", this.props);
        const {children} = this.props;
        return(
            <button className="button-with-props">
                {children ? children : "Click"}
            </button>
        );
    }
}