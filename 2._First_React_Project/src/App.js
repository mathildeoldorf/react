import React from 'react';
import './App.css';
import ProfilePage from './components/profile_page/ProfilePage';
import BusPage from './components/bus_page/BusPage';
import ButtonWithProps from './components/button/ButtonWithProps';
import NewPage from './components/new_page/NewPage';
import ButtonWithChildren from './components/button/ButtonWithChildren';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      pageToRender: undefined
    };
  }

  handleNavButtonClicked = ( navpage ) => {

    if(navpage === 'bus'){
      this.setState({pageToRender: <BusPage />});
    }
    else if( navpage === 'profile') {
      this.setState({pageToRender: <ProfilePage />});
    }
    else if( navpage === 'new') {
      this.setState({pageToRender: <NewPage />});
    }

  };

  handleButtonClicked = (text) => {
    console.log(text);
  }

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

    const {pageToRender} = this.state;
 
    console.log("this is the state", pageToRender );

    //WITH IF STATEMENT OUTSIDE
    // let pageContent;
    // if( navpage === 'bus'){
    //   pageContent = <BusPage />;
    // } else{
    //   pageContent = <ProfilePage />;
    // }

    return (
      
      <div className="App">
        <ButtonWithProps buttonText={"Submit"} 
          customButtonStyle={{backgroundColor: "orange"}} 
          onButtonClicked={() => this.handleButtonClicked("First button ever clicked")} />

        <div onClick={() => this.onDivClicked('div')}>Div</div>


        <ButtonWithProps  buttonText={"Bus"}
          customButtonStyle={{backgroundColor: "red"}}
          onButtonClicked={() => this.setState({ pageToRender : <BusPage /> })}/>

        <ButtonWithProps  buttonText={"Profile"}
          customButtonStyle={{backgroundColor: "yellow"}}
          onButtonClicked={() => this.setState({ pageToRender : <ProfilePage /> })}/>

        <ButtonWithProps  buttonText={"New"}
          onButtonClicked={() => this.setState({ pageToRender : <NewPage /> })}/>
        
        {/* { navpage === 'bus' ? 
        // WITH SHORT HAND IF INSIDE THE RENDER
          <BusPage />
          :
          <ProfilePage />
        } */}

        {pageToRender}

        <ButtonWithChildren>
          ButtonWithChildren
        </ButtonWithChildren>

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
