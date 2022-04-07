import logo from './logo.svg';
import './App.css';
import React from "react";
// Import the CustomModal that we created in Modal.js.
import Rm from "./components/Container"

import axios from "axios";


class App extends React.Component {
  // Here comes our constructor.
  constructor(props) {
    super(props);
    // The state object is initialized in the constructor of the component.
    // It has three properties, which we initialize:
    // viewCompleted (Boolean)
    // activeItem (object)
    // todoList (array).
    this.state = {
     
    };
  }

  render () 
  {
    return (
      <div>
        <Rm></Rm>
      </ div>
    );
  }

}

// Export our App so that it can be rendered in index.js, where it is imported.
export default App;
