import React, {Component} from 'react';
import Axios from 'axios';
import './Forecast.css';
import SingleForecast from './SingleForecast';

import Loader from './../../components/Loader/Loader';

const APIkey = '0a12db146c850ff71f959d2eac0d28ef';

export default class Forecast extends Component {

    _isMounted = false;

    state = {
        isLoading: this.props.isLoading,
        currentForecastList: []
    }

    componentDidMount(){
        this._isMounted = true;

            if(this.props.city){
                this.handleFetchForecastData(this.props.city);
            } 
    }

    handleLoading = () => {
        if(this.state.isLoading){
            return <Loader/>;
        }
    } 
    
    async handleFetchForecastData(city){
        
        const data = await Axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=metric`);

        if(this._isMounted ){

            // setTimeout(() => {

                let fiveDayForecastListData = data.data.list.map( singleForecast => {

                    let singleForecastData = {

                    date: singleForecast.dt,
                    city: data.data.city.name,
                    country: data.data.city.country,

                    weather: singleForecast.weather[0].main,
                    desc: singleForecast.weather[0].description,

                    aTemp: singleForecast.main.temp,
                    fTemp: singleForecast.main.feels_like,
                    minTemp: singleForecast.main.temp_min,
                    maxTemp: singleForecast.main.temp_max,
                    
                    humidity: singleForecast.main.humidity,
                    clouds: singleForecast.clouds.all,
                    wind: singleForecast.wind.speed,
                    sunrise: data.data.city.sunrise,
                    sunset: data.data.city.sunset
                    
                    }

                    return singleForecastData;

                });
            
                this.setState({
                    currentForecastList: fiveDayForecastListData,
                    isLoading: false 
                });
            // }, 1500);
        }
    }

    handleSearchInput = () => {
        this.handleFetchForecastData(this.props.city);
    }

    handleRenderSingleForecast = () => {
        const { currentForecastList } = this.state;
        
        let fiveDayForecastList = currentForecastList.map(( singleForecast, index ) => {
            if(index % 8 === 0){
                console.log(singleForecast);

                return( 
                    <SingleForecast key={"forecast-" + index} isLoading={this.state.isLoading} forecastData={ singleForecast } />
                );
            }
        });

        return fiveDayForecastList;
    }

    render(){

        const { city } = this.props;
        
        return(
            <div>
                {this.handleLoading()}
                <h2 className="Header">Five-day forecast</h2>
                <p className="Header">{ city }</p>
                <div className="Forecast">
                    {this.handleRenderSingleForecast()}
                </div>
            </div>
        );
    }
}