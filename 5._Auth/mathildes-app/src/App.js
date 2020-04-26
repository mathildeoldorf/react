import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import Axios from "axios";

// import Key from "./data/api.json";
// const APIkey = Key.APIkey;


import Login from './pages/login'

// const data = await Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIkey}&units=metric`);



function App() {
  return (
    <Router basename={"/"}>
      <div className="App">
        <header className="App-header">
          <Link to={`${process.env.PUBLIC_URL}/`}><h1>Mathildes app</h1></Link>
        </header>
        <nav className="Navigation">
          <ul>
            <li>
            <NavLink activeClassName="active" to={`${process.env.PUBLIC_URL}/`} exact>Home</NavLink>
            </li>
            <li>
            <NavLink activeClassName="active" to={`${process.env.PUBLIC_URL}/login`}>Login</NavLink>
            </li>
          </ul>
        </nav>
        <main>
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`}/>
            <Route exact path={`${process.env.PUBLIC_URL}/login`} component={ (props) => <Login/> }/>
          </Switch>
          </main>
          <footer>
            This App is created by Mathilde Runge
          </footer>
      </div>
    </Router>
  );
}

export default App;
