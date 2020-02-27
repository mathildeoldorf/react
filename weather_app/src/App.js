import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Search from './components/Search/Search';
import Forecast from './pages/Forecast/Forecast';

import './App.css';

// PAGES

// import Navigation from './components/Navigation';
// import Routes from './components/Routes';

export default class App extends Component {

  state = {
    city: undefined
  }

  handleCallbackFunction = (childData) => {
   
    this.setState({
      city: childData
    });

    localStorage.setItem('city', childData);
    // this.setState({
    //   city: localStorage.city
    // });

    console.log(localStorage);
}

  // handleSearchInput = (event) => {
  //   // this.setState({
  //   //   city: event.target.value
  //   // });

  //   // console.log(this.state.city);
  //   console.log('this.state.city');
  // }

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
            <Route exact path="/">
            </Route> 
            <Route path="/forecast" component={(props) => <Forecast {...props} city={this.state.city}/>}/>
          </Switch>

          {/* < Navigation /> */}
          {/* <Routes /> */}

          
          <main>
            {/* < Search handleSearchInput={this.handleSearchInput} /> */}
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

