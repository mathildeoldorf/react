import React, {Component} from 'react';
import Axios from 'axios';
import './CurrentWeather.css';

const APIkey = '0a12db146c850ff71f959d2eac0d28ef';

let currentWeatherData = {};

export default class Forecast extends Component {

    // state = {
    //     date: undefined,       
    //     city: undefined,
    //     country: undefined,

    //     weather: undefined,
    //     desc: undefined,
    //     icon: undefined,

    //     aTemp: undefined,
    //     fTemp: undefined,
    //     minTemp: undefined,
    //     maxTemp: undefined,
                
    //     humidity: undefined,
    //     clouds: undefined,
    //     wind: undefined,
    //     sunrise: undefined,
    //     sunset: undefined
    // }

    componentDidMount(){
        if(this.props.city){
            this.handleFetchCurrentWeatherData(this.props.city);
        }
        else{
            return null;
        }     
    }
    
    handleFetchCurrentWeatherData(city){
        Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIkey}&units=metric`)
        .then(response => {

            currentWeatherData = {
                date: response.data.dt,
                city: response.data.name,
                country: response.data.sys.country,

                weather: response.data.weather[0].main,
                desc: response.data.weather[0].description,
                icon: response.data.weather[0].icon,

                aTemp: response.data.main.temp + ' °c',
                fTemp: response.data.main.feels_like + ' °c',
                minTemp: response.data.main.temp_min + ' °c',
                maxTemp: response.data.main.temp_max + ' °c',
                
                humidity: response.data.main.humidity,
                clouds: response.data.clouds.all,
                wind: response.data.wind.speed + ' m/s',
                sunrise: response.data.sys.sunrise,
                sunset: response.data.sys.sunset

            };

            this.handleConvertDate(currentWeatherData);
            this.handleIconUrl(currentWeatherData);
            this.handleCapitalizeString(currentWeatherData);

            this.setState({
                currentWeather: currentWeatherData
            });
            
        })
    }

    handleSearchInput = () => {
        this.handleFetchCurrentWeatherData(this.state.city);
    }

    handleConvertDate = (weatherData) => {
        let unixDate = weatherData.date;
        let dateObj = new Date(unixDate * 1000);

        let dateStr = dateObj.toDateString();
        let date = dateStr.slice(4, dateStr.length);
        
        let time = dateObj.toTimeString().slice(0, -41);

        weatherData.date = date;
        weatherData.time = time;
    }

    handleIconUrl = (weatherData) => {
        let icon = weatherData.icon;
        let iconUrl = 'http://openweathermap.org/img/w/' + icon + '.png';
        weatherData.icon = iconUrl;
    }

    handleCapitalizeString = (weatherData) => {
        let description = weatherData.desc.charAt(0).toUpperCase() + weatherData.desc.slice(1);
        weatherData.desc = description;
    } 

    render(){
        let icon = currentWeatherData.icon;
        console.log(this.state);
        // const { currentWeather } = this.state;

        return(
            <div>
                <h1>Here is your forecast</h1>
           
                <div className="Current-weather">
                    <h1>{currentWeatherData.city}, {currentWeatherData.country}</h1>
                    <div className="Icon" style={{backgroundImage: 'url(' + icon + ')'}}></div>
                    <h2>{currentWeatherData.aTemp}</h2>
                    <h2>{currentWeatherData.desc}</h2>
                    <h3>Wind: {currentWeatherData.wind}</h3>
                </div>    
            </div>
        );
    }
}