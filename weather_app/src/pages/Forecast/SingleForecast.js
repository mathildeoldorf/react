import React, {Component} from 'react';

import { FaSun as Clear } from 'react-icons/fa'; // importing an icon from a package inside react-icons
import {FaCloud as Clouds} from 'react-icons/fa';
import {FaCloudRain as Rain} from 'react-icons/fa';
import {FaWind as Wind} from 'react-icons/fa';
import {FaSnowflake as Snow} from 'react-icons/fa';
import {FaWind as Mist} from 'react-icons/fa';
import {FaCloudSunRain as Logo} from 'react-icons/fa';

import './SingleForecast.css';

export default class SingleForecast extends Component {

    state = {
        isLoading: this.props.isLoading
    }

    componentDidMount(){
        this.handleCapitalizeString();
        this.handleConvertDate();
    }

    handleWeatherType = (weather) => {
        let iconToRender;

        switch(weather){
            case 'Clouds': 
                iconToRender = <Clouds className="Icon"/>;
            break;
            case 'Clear':
                iconToRender = <Clear className="Icon"/>;
            break;
            case 'Rain':
                iconToRender = <Rain className="Icon"/>;
            break;
            case 'Snow':
                iconToRender = <Snow className="Icon"/>;
            break;
            case 'Mist':
                iconToRender = <Mist className="Icon"></Mist>;
            break;
            default:
                iconToRender = <Logo className="Logo"></Logo>
        }
        
        return iconToRender;
    
    }

    handleConvertDate = () => {
        let unixDate = this.props.forecastData.date;
        let dateObj = new Date(unixDate * 1000);
        let dateStr = dateObj.toDateString();
        let date = dateStr.slice(4, dateStr.length);
        let day = dateStr.slice(0, 4);
        console.log(day);
        // let time = dateObj.toTimeString().slice(0, -41);

        this.setState({
            date: date,
            day: day
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
        const { aTemp, fTemp, wind, weather, city } = this.props.forecastData;
        const { day, date, desc } = this.state;

        return(
            <div>
                <div className="Single-forecast Current-weather">
                    <h3>{day}</h3>
                    <p>{date}</p>
                    {this.handleWeatherType(weather)}
                    <h2 className="Temp">{aTemp} °c</h2>
                    <p>Feels like {fTemp} °c</p>
                    <h2 className="Weather">{desc}</h2>
                    <p><Wind/></p>
                    <p className="Wind">{wind} m/s</p>
                </div>    
            </div> 
        );
    }
}