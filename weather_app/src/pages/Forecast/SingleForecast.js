import React, {Component} from 'react';

import { FaSun as Clear } from 'react-icons/fa'; // importing an icon from a package inside react-icons
import {FaCloud as Clouds} from 'react-icons/fa';
import {FaCloudRain as Rain} from 'react-icons/fa';
import {FaWind as Wind} from 'react-icons/fa';
import {FaSnowflake as Snow} from 'react-icons/fa';
import {FaWind as Mist} from 'react-icons/fa';

import './SingleForecast.css';

export default class SingleForecast extends Component {

    state = {
        isLoading: this.props.isLoading
    }

    componentDidMount(){
        // let singleForecast = this.props.forecastData;
        this.handleCapitalizeString();
        this.handleConvertDate();
    }

    handleWeatherType = (weather) => {
        let iconToRender;
    
        let arrayWeather = ['Clouds', 'Clear', 'Rain', 'Snow'];
        let arrayIcons = [<Clouds className="Icon"/>, <Clear className="Icon"/>, <Rain className="Icon"/>, <Snow className="Icon"/>, <Mist className="Icon"/>];
    
        if(arrayWeather.includes(weather)){
            iconToRender = arrayIcons[arrayWeather.indexOf(weather)];
            return iconToRender;
        }
    
    }

    handleConvertDate = () => {
        let unixDate = this.props.forecastData.date;
        let dateObj = new Date(unixDate * 1000);
        let dateStr = dateObj.toDateString();
        let date = dateStr.slice(4, dateStr.length);
        // let time = dateObj.toTimeString().slice(0, -41);

        this.setState({
            date: date
            // time: time
        });
    
    }

    handleCapitalizeString = () => {
        let description = this.props.forecastData.desc.charAt(0).toUpperCase() + this.props.forecastData.desc.slice(1);

        this.setState({
            desc: description
        });
    } 



    render(){
        const { aTemp, fTemp, wind, weather } = this.props.forecastData;
        const { date, desc } = this.state;

        return(
            <div>
                <div className="Single-forecast Current-weather">
                    {/* <h1 className="Header-weather">{city} | {country}</h1> */}
                    <p>{date}</p>
                    <h2 className="Temp">{aTemp} °c</h2>
                    <p>Feels like {fTemp} °c</p>
                    {this.handleWeatherType(weather)}
                    <h2 className="Weather">{desc}</h2>
                    <p><Wind/></p>
                    <h3 className="Wind">{wind} m/s</h3>
                </div>    
            </div> 
        );
    }
}