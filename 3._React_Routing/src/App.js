import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import OnePage from './pages/OnePage/OnePage';
import AboutPage from './pages/About/About';
import ThreePage from './pages/ThreePage/ThreePage';
import ThemePage from './pages/theme/Theme';

 class App extends Component{

  state = {
    color: undefined
  }

  handleColorFromTheme = (colorFromTheme) => {
    console.log(colorFromTheme);
    this.setState({color: colorFromTheme});
  }

  render() {

  return (
    <Router>
      <div className="App" style={{backgroundColor: this.state.color}}>

        <nav>
          <ul>
            <li>
              <Link to="/">Front page</Link>
            </li>
            <li>
              <Link to="/about">About page</Link>
            </li>
            <li>
              <Link to="/third">Third page</Link>
            </li>
            <li>
              <Link to="/theme">Theme page</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={(props) => <OnePage {...props}/>}/>
          
          <Route path="/about" component={(props) => <AboutPage {...props} />}/>

          <Route path="/third" component={(props) => <ThreePage {...props} />} />

          <Route path="/theme" component={(props) => <ThemePage {...props} propsFromParent={this.handleColorFromTheme}/>} />
        
        </Switch>
        Looks good
        
        
        
      </div>
    </Router>
  );
}
}

export default App;
