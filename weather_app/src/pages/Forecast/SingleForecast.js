import React, {Component} from 'react';

export default class SingleForecast extends Component {

    render(){

        const { forecastData } = this.props;

        console.log(forecastData);

        return(
            <div>
                <h1>Here is your single forecast</h1>
           
                <div className="Single-forecast">
                    <h1>{forecastData.city + ' ' + forecastData.country}</h1>
                    <div className="Icon" ></div>
                    <h2></h2>
                    <h2></h2>
                    <h3></h3>
                </div>    
            </div>
        );
    }
}