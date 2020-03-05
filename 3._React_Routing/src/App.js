import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// import OnePage from './pages/onepage/OnePage';
import AboutPage from './pages/about/About';
import ThemePage from './pages/theme/Theme';
import FormPage from './pages/form/Form';
// import Question from './components/icons';
import CitiesPage from './pages/cities/Cities';


import { FaBeer, FaSun } from 'react-icons/fa'; // importing an icon from a package inside react-icons
// import Question from './components/icons';
// import { FaSun } from 'react-icons/fa'; 

 class App extends Component{
  // constructor(props){

  //   super(props);
  //   this.
    state = {
      color: undefined,
      welcomeMessage: <h1>Hello dear stranger <FaSun /> </h1>
      // icon: <FaSun />
    }
// }

// Life cycle method for when the component mounts
componentDidMount() {
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const welcomeMessageString = localStorage.getItem('welcomeMessage');

  if(firstName && lastName && welcomeMessageString){
    this.setState({firstName});
    this.setState({lastName});

    const welcomeMessage = <h1>{welcomeMessageString} <FaBeer /> </h1>
    this.setState({welcomeMessage});
    // this.setState({icon: <FaBeer /> });
  }

}

  handleColorFromThemePage = (colorFromTheme) => {
    console.log(colorFromTheme);
    this.setState({color: colorFromTheme});
  }

  handleFormInputValues = (firstNameFromForm, lastNameFromForm) => {
    console.log(firstNameFromForm, lastNameFromForm);

    if(firstNameFromForm !== "" && lastNameFromForm !== ""){
      
      const welcomeMessageString = `Welcome back ${firstNameFromForm} ${lastNameFromForm}`;
      const welcomeMessage = <h1>{welcomeMessageString} <FaBeer /></h1>
      this.setState({welcomeMessage});
      // this.setState({icon: <FaBeer /> });

      localStorage.setItem('firstName', firstNameFromForm);
      localStorage.setItem('lastName', lastNameFromForm);      
      localStorage.setItem('welcomeMessage', welcomeMessageString);      
      
      console.log(localStorage);
    }

  }

  render() {

    const {color, welcomeMessage, icon} = this.state;

    return (
      
    <Router>
      <div className="App" style={{backgroundColor: color}}>

        <nav>
          <ul>
            <li>
              <Link to="/">Front page</Link>
            </li>
            <li>
              <Link to="/form">Form page</Link>
            </li>
            <li>
              <Link to="/about">About page</Link>
            </li>
            <li>
              <Link to="/theme">Theme page</Link>
            </li>
            <li>
              <Link to="/cities">Cities page</Link>
            </li>
          </ul>
        </nav>

        <Switch>

          <Route exact path="/">
          {welcomeMessage} {icon}
            
          </Route>
          
          <Route path="/form" component={(props) => <FormPage {...props} propsFromForm={this.handleFormInputValues} />}/>
          
          <Route path="/about" component={(props) => <AboutPage {...props} />}/>

          <Route path="/theme" component={(props) => <ThemePage {...props} propsFromParent={this.handleColorFromThemePage}/>} />
          <Route path="/cities" component={(props) => <CitiesPage {...props}/>} />

          {/* // passing props is used for using history to redirect */}
          {/* // ... = spread operator - I get only the keys and the values in a new object {} */}
            {/* // Loops through all elements and wraps them in a curly brace to put them in a new Object */}

        
        </Switch>
        {/* <Question /> */}
      </div>
    </Router>
    );
  }
}

export default App;
