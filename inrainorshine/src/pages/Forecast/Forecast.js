import React, { Component } from "react";

import "./Forecast.css";
import SingleForecast from "./SingleForecast";

import Loader from "../../components/Loader/Loader";

import Axios from "axios";
import Key from "./../../data/api.json";
const APIkey = Key.APIkey;

export default class Forecast extends Component {

    state = {
        isLoading: this.props.isLoading,
        currentForecastList: []
    }

    componentDidMount(){
        
        if(this.props.city){

            this.handleFetchForecastData(this.props.city);

            if(this.state.isLoading){

                this.handleLoading();
    
            }
            
        } 
        
    }

    handleLoading = () => {

        if(this.state.isLoading){
            return <Loader/>;
        }

    } 
    
    async handleFetchForecastData(city){
        
        const data = await Axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=metric`);

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
    }

    handleSearchInput = () => {

        this.handleFetchForecastData(this.props.city);

    }

    handleRenderSingleForecast = () => {

        const { currentForecastList } = this.state;
        
        let fiveDayForecastList = currentForecastList.map(( singleForecast, index ) => {
            if(index % 8 === 0){

                return( 

                    <SingleForecast key={ "forecast-" + index } isLoading={ this.state.isLoading } forecastData={ singleForecast } />

                );

            }
            else {

                return null;

            }

        });

        return fiveDayForecastList;
    }

    render(){

        const { city, country } = this.props;
        
        return(

            <div className="Forecast-container">
                <h1 className="Header">{ city + " | " + country }</h1>
                
                { this.handleLoading() }
                <div className="Forecast">
                    { this.handleRenderSingleForecast() }
                </div>
            </div>
            
        );
    }
}