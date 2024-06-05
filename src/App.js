import React, { Component } from "react";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/de';
import {isMobile} from 'react-device-detect';

import "./App.css";
import SelectableCalendar from './components/SelectableCalendar.js';


const localizer = momentLocalizer(moment);

class App extends Component {

  render() {
    return (
      <div className="App">
        <div style={{
          padding: isMobile ? "0 5px 5px" : "0 50px 50px",
          display: "flex",
          height: isMobile ? "calc(100% - 5px)": "calc(100% - 50px)",
        } }>
          
        <div id="main" className="Body">
          <p>Einsatzplaner Julia</p>
          <SelectableCalendar
              localizer={localizer}
          />
      </div>
        </div>
        </div>
        
    );
  }
}

export default App;