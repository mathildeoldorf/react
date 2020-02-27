import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Search from './components/Search/Search';
import CurrentWeather from './pages/CurrentWeather/CurrentWeather';
import Forecast from './pages/Forecast/Forecast';

import './App.css';

// PAGES

// import Navigation from './components/Navigation';
// import Routes from './components/Routes';

export default class App extends Component {

  state = {
    city: 'Copenhagen'
  }

  handleCallbackFunction = (childData) => {
    this.setState({
      city: childData
    });
}

  render(){

    console.log(this.state.city);

    return (

      <Router>
        
        <div className="App">
          <header className="App-header">
            <h1>React Weather App</h1>
          </header>

          <nav>
                <ul>
                    <li>
                    <Link to="/">Front page</Link>
                    </li>
                    <li>
                    <Link to="/forecast">Forecast page</Link>
                    </li>
                </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={(props) => <CurrentWeather {...props} city={this.state.city}/>}/>
           
            <Route path="/forecast" component={(props) => <Forecast {...props} city={this.state.city}/>}/>
          </Switch>

          {/* < Navigation /> */}
          {/* <Routes /> */}

          <main>

            < Search parentCallback = {this.handleCallbackFunction}/>
          </main>
          <footer>
            Page created by Mathilde Runge
          </footer>
        </div>
      </Router>
        
    );

  }
  
}

