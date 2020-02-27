import React, {Component} from 'react';
import Axios from 'axios';
import './Forecast.css';
import SingleForecast from './SingleForecast';

const APIkey = '0a12db146c850ff71f959d2eac0d28ef';

let fiveDayForecastListData = [];

export default class Forecast extends Component {

    _isMounted = false;

    state = {
        isLoading: true
    }

    componentDidMount(){
        // console.log(this.props.city);
        this._isMounted = true;

        if(this.props.city){
            this.handleFetchForecastData(this.props.city);
        }     
    }
    
    handleFetchForecastData(city){
        Axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=metric`)
        .then(response => {
            console.log(response);

            fiveDayForecastListData = [];

            let fiveDayForecastList = response.data.list;

            fiveDayForecastList.map( singleForecast => {
                let singleForecastData = {

                date: singleForecast.dt,
                city: response.data.city.name,
                country: response.data.city.country,

                weather: singleForecast.weather[0].main,
                desc: singleForecast.weather[0].description,
                icon: singleForecast.weather[0].icon,

                aTemp: singleForecast.main.temp + ' °c',
                fTemp: singleForecast.main.feels_like + ' °c',
                minTemp: singleForecast.main.temp_min + ' °c',
                maxTemp: singleForecast.main.temp_max + ' °c',
                
                humidity: singleForecast.main.humidity,
                clouds: singleForecast.clouds.all,
                wind: singleForecast.wind.speed + ' m/s',
                sunrise: response.data.city.sunrise,
                sunset: response.data.city.sunset

                }

                this.handleConvertDate(singleForecastData);
                this.handleIconUrl(singleForecastData);
                this.handleCapitalizeString(singleForecastData);

                fiveDayForecastListData.push(singleForecastData);

                return fiveDayForecastListData;

            });
            
            if( this._isMounted ){
                this.setState({
                    currentForecastList: fiveDayForecastListData,
                    isLoading: false
                
                });
                  // console.log(this.state);
            }

          
            
        });
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
        return weatherData;
    } 

    render(){
        // console.log('hello', this.props.city);

        // const { city } = this.props;
        // const { currentForecastList } = this.state;

        return(
            <div>
                <h1>Here is your five day forecast</h1>

                {fiveDayForecastListData.map(( singleForecast, index ) => {
                    return <SingleForecast key={"forecast-" + index} forecastData={ singleForecast } />
                })}
               
            </div>
        );
    }
}