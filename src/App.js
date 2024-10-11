import React, { Component } from "react";
import {isMobile} from 'react-device-detect';

import "./App.css";
import initReactFastclick from 'react-fastclick';


import { Routes, Route } from 'react-router-dom';
import Home from "./pages";
import Shifts from "./pages/shifts.js";
import TimeSheet from "./pages/timeSheet.js";
import NavigationBar from "./components/NavigationBar.js";


initReactFastclick();

class App extends Component {


  render() {
    console.log("Version 1.2.1");

    return (
      
      <div className="App">
        
        <NavigationBar />
        <div className="Body">
          <Routes>
            <Route index element={<Home />} />
            <Route path="einsatzplaner" element={<Shifts />} />
            <Route path="stundenzettel" element={<TimeSheet />} />
          </Routes>

        </div>
      
          
        </div>
        
    );
  }
}

export default App;