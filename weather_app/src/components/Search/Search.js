import React, {Component} from 'react';
import './Search.css';

export default class Search extends Component {

    state = {
        city: undefined
    }

    handleInput = (event) => {
        this.setState({
            city: event.target.value
        });
        console.log(this.state);
    }

    handleSendSearchRequestData = () => {
        this.props.parentCallback(this.state.city);
   }

    render(){
        
        return(
            <div>
                <input type="text" placeholder="search"  onChange={ (event) => this.handleInput(event) }/>
                <button onClick={ () => this.handleSendSearchRequestData()}>Search</button>
            </div>
        );
    }
}