import logo from './logo.svg';
import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// Import the CustomModal that we created in Modal.js.
import Ratings from "./components/Ratings"
import {useState, useEffect} from 'react';



function App () {

  return (
    <div className = "App">
      <Ratings />
    </div>
  );
}
// Export our App so that it can be rendered in index.js, where it is imported.
export default App;
