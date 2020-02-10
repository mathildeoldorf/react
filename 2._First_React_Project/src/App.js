import React from 'react';
import './App.css';
import ProfilePage from './components/profile_page/ProfilePage';
import BusPage from './components/bus_page/BusPage';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      navpage: 'bus'
    };
  }

  onNavButtonClicked = ( navpage ) => {
    this.setState({ navpage });
  };

  onDivClicked = ( navpage ) => {
    this.setState({ navpage });

    if(navpage === 'bus'){
      return  <BusPage />;
    }
    else if (navpage === 'profile'){
      return  <ProfilePage />;
    }
    else if (navpage === 'div'){
      return  'Something';
    }
  };

  render(){

    const {navpage} = this.state;
    // const {navpage} = this.state;
 
    console.log("this is the state", navpage );

    //WITH IF STATEMENT OUTSIDE
    // let pageContent;
    // if( navpage === 'bus'){
    //   pageContent = <BusPage />;
    // } else{
    //   pageContent = <ProfilePage />;
    // }

    return (
      
      <div className="App">
        <div onClick={() => this.onDivClicked('div')}>Div</div>
        <button onClick={() => this.onNavButtonClicked('bus')}>Bus</button>
        <button onClick={() => this.onNavButtonClicked('profile')}>Profile</button>
        { navpage === 'bus' ? 
        // WITH SHORT HAND IF INSIDE THE RENDER
          <BusPage />
          :
          <ProfilePage />
        }

        <h2 className="App-header-two">Welcome to</h2>
        
        <NewClass />
        
      </div>
    );
  }
}

class NewClass extends React.Component{
  render(){
    return(
      <div className="newClass">
        <h2 className="App-header-one">The first react project</h2>
      </div>
    );
  }
}

export default App;
