const whatToRender = <div>Does jsx work?</div>;

// BASE COMPONENT - can be used like an html tag
class App extends React.Component {
  render() {
    return (
      <fragment>
        <div className="">First component</div>
        <div>Hello</div>
        <Introduction/>
      </fragment>
    );
  }
}

class Introduction extends React.Component {
  render(){
    return(
      <fragment>
        <p>Name</p>
        <p>Age</p>
        <p>City</p>
      </fragment>
    );
  }
}

ReactDOM.render(
  <App></App>,
  document.getElementById("root")
);