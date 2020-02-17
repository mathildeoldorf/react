import React, {Component} from "react";
import "./Button.css";

export default class ButtonWithProps extends Component{
    render(){
        const {buttonText, customButtonStyle, onButtonClicked} = this.props;
        return(
            <button className="button-with-props" 
            style={customButtonStyle}
            onClick={onButtonClicked}>
                {buttonText ? buttonText : "Click"}
            </button>
        );
    }
}