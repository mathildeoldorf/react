import React, {Component} from 'react';
import './CurrentWeather.css';

import { FaSun as Clear } from 'react-icons/fa'; // importing an icon from a package inside react-icons
import {FaCloud as Clouds} from 'react-icons/fa';
import {FaCloudRain as Rain} from 'react-icons/fa';
import {FaWind as Wind} from 'react-icons/fa';
import {FaSnowflake as Snow} from 'react-icons/fa';
import {FaWind as Mist} from 'react-icons/fa';

import Loader from './../../components/Loader/Loader';

export default class Forecast extends Component {

    _isMounted = false;

    state = {
        isLoading: this.props.isLoading
    }

    componentDidMount(){
        this._isMounted = true; 

        console.log(this.props.isLoading);

        if(this.state.isLoading){
            this.handleLoading();
        }
       
        if(this.state.isLoading === false){
            this.handleConvertDate();
            this.handleCapitalizeString();
        }
    }

    handleLoading = () => {
        if(this.state.isLoading){
            return <Loader/>;
        }
    } 

    handleConvertDate = () => {
        let unixDate = this.props.date;
        let dateObj = new Date(unixDate * 1000);
        let dateStr = dateObj.toDateString();
        let date = dateStr.slice(4, dateStr.length);
        let time = dateObj.toTimeString().slice(0, -41);

        this.setState({
            date: date,
            time: time
        });
    
    }

    handleWeatherType = (weather) => {
        let iconToRender;

        let arrayWeather = ['Clouds', 'Clear', 'Rain', 'Snow'];
        let arrayIcons = [<Clouds className="Icon"/>, <Clear className="Icon"/>, <Rain className="Icon"/>, <Snow className="Icon"/>, <Mist className="Icon"></Mist>];

        if(arrayWeather.includes(weather)){
            iconToRender = arrayIcons[arrayWeather.indexOf(weather)];
            return iconToRender;
        }

    }

    handleCapitalizeString = () => {
        let description = this.props.desc.charAt(0).toUpperCase() + this.props.desc.slice(1);
        this.setState({
            desc: description
        });
    } 

    render(){
        const { city, country, aTemp, fTemp, wind, weather } = this.props;
        const { date, time, desc } = this.state;

        return(
            <div> 
                {this.handleLoading()}
                <h2 className="Header">Today's weather</h2>
                <div className="Current-weather">
                    <h1 className="Header-weather">{city} | {country}</h1>
                    <p>{date} | {time}</p>
                    {this.handleWeatherType(weather)}
                    
                    <h2 className="Temp">{aTemp} °c</h2>
                    <p>Feels like {fTemp} °c</p>
                    <h2>{desc}</h2>
                    <h3><Wind/></h3>
                    <h3>{wind} m/s</h3>
                </div>    
            </div>
        );
    }
}