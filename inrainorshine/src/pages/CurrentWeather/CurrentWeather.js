import React, { Component } from "react";
import "./CurrentWeather.css";

import { FaSun as Clear } from "react-icons/fa";
import { FaCloud as Clouds } from "react-icons/fa";
import { FaCloudRain as Rain } from "react-icons/fa";
import { FaWind as Wind } from "react-icons/fa";
import { FaSnowflake as Snow } from "react-icons/fa";
import { FaWind as Mist } from "react-icons/fa";
import { FaCloudSunRain as Logo } from "react-icons/fa";

import Loader from "../../components/Loader/Loader";

export default class Forecast extends Component {

    _isMounted = false;

    state = {
        isLoading: this.props.isLoading
    }

    componentDidMount(){

        if(this.state.isLoading){

            this.handleLoading();

        }
       else {

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
        let day = dateStr.slice(0, 4);

        this.setState({
            date: date,
            time: time,
            day: day
        });
    
    }

    handleWeatherType = (weather) => {

        let iconToRender;

        switch( weather ){
            case "Clouds": 
                iconToRender = <Clouds className="Icon"/>;
            break;
            case "Clear":
                iconToRender = <Clear className="Icon"/>;
            break;
            case "Rain":
                iconToRender = <Rain className="Icon"/>;
            break;
            case "Drizzle":
                iconToRender = <Rain className="Icon"/>;
            break;
            case "Snow":
                iconToRender = <Snow className="Icon"/>;
            break;
            case "Mist":
                iconToRender = <Mist className="Icon"></Mist>;
            break;
            default:
                iconToRender = <Logo className="Logo"></Logo>
        }
        
        return iconToRender;

    }

    handleCapitalizeString = () => {

        let description = this.props.desc.charAt(0).toUpperCase() + this.props.desc.slice(1);
        
        this.setState({
            desc: description
        });

    } 

    render(){
        const { city, country, aTemp, fTemp, wind, weather } = this.props;
        const { date, time, desc, day } = this.state;

        return(

            <div className="Current-weather-container"> 
                { this.handleLoading() }
                <h1 className="Header">{ city } | { country }</h1>
                <div className="Current-weather">
                    <h2 className="Day">{ day }</h2>
                    <p>{ date } | { time }</p>
                    { this.handleWeatherType(weather) }
                    
                    <h2 className="Temp">{ aTemp } °c</h2>
                    <p>Feels like { fTemp } °c</p>
                    <h2 className="Weather">{desc}</h2>
                    <p className="Wind-icon"><Wind/></p>
                    <p className="Wind">{ wind } m/s</p>
                </div>    
            </div>
            
        );
    }
}