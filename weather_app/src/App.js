import React, {Component} from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import Search from "./components/Search/Search";
import CurrentWeather from "./pages/CurrentWeather/CurrentWeather";
import Forecast from "./pages/Forecast/Forecast";

import {FaCloudSunRain as Logo} from "react-icons/fa";


import Axios from "axios";
const APIkey = "0a12db146c850ff71f959d2eac0d28ef";

// PAGES

// import Navigation from "./components/Navigation";
// import Routes from "./components/Routes";

export default class App extends Component {

  _isMounted = false;

  state = {
    isLoading: true,
    city: "Copenhagen",
    country: undefined,
    weather: undefined,
    desc: undefined,
    aTemp: null,
    fTemp: null,
    minTemp: null,
    maxTemp: null,
    humidity: null,
    clouds: null,
    wind: null,
    sunrise: null,
    sunset: null
  }

  componentDidMount(){
    this._isMounted = true; 
    if(this.state.isLoading){
      console.log("loading");
      if(this.state.city){
        this.handleFetchCurrentWeatherData(this.state.city);
      }  
    }   
  }

  async handleFetchCurrentWeatherData(city){

    const data = await Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIkey}&units=metric`);

        if(this._isMounted ){

          // setTimeout(() => {

            this.setState( {
                date: data.data.dt,
                city: data.data.name,
                country: data.data.sys.country,

                weather: data.data.weather[0].main,
                desc: data.data.weather[0].description,
                icon: data.data.weather[0].icon,

                aTemp: data.data.main.temp,
                fTemp: data.data.main.feels_like,
                minTemp: data.data.main.temp_min,
                maxTemp: data.data.main.temp_max,
                
                humidity: data.data.main.humidity,
                clouds: data.data.clouds.all,
                wind: data.data.wind.speed,
                sunrise: data.data.sys.sunrise,
                sunset: data.data.sys.sunset,
                isLoading: false
            } );

              this.handleWeatherType(this.state.weather);

          // }, 1500);

        }
    }

  handleWeatherType = (weather) => {
    document.querySelector(".App").className = "App " + weather;
  }

    handleCallbackFunctionSearchData = (childDataSearch) => {
      console.log(childDataSearch);
      this.setState({
        city: childDataSearch.city,
        isLoading: childDataSearch.isLoading
      });
      this.handleFetchCurrentWeatherData(childDataSearch.city);
    }

    handleCallBackFunctionWeatherType = (childDataWeather) => {
      this.setState({
        weather: childDataWeather
      });
    }

  render(){   
    return (
      <Router>
        <div className="App">
          <div className="Grid-container Grid-two-thirds">  
          <nav className="Navigation">
            <header className="App-header">
            <Link to="/"><h1>In Rain or Shine</h1><div className="Logo"><Logo/></div> </Link>
            </header>
                <ul>
                    <li>
                    <NavLink activeClassName="active" to="/" exact>Current Weather</NavLink>
                    </li>
                    <li>
                    <NavLink activeClassName="active" to="/forecast">5-day Forecast</NavLink>
                    </li>
                </ul>
                < Search parentCallbackSearchData = {this.handleCallbackFunctionSearchData}/>
          </nav>
          <main>
          <Switch>
            <Route exact path="/" component={(props) => <CurrentWeather {...props} {...this.state} weather={this.state.weather} />}/>
            <Route exact path="/forecast" component={(props) => <Forecast {...props} city={this.state.city} isLoading={this.state.isLoading} country={this.state.country}/>}/>
          </Switch>
          </main>
          </div>  

          <footer>
            This Weather App is created by Mathilde Runge
          </footer>
        </div>
      </Router>
        
    );

  }
  
}

