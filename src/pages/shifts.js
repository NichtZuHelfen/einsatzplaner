// Filename - pages/about.js


import React from "react";

import 'moment/locale/de';
import SelectableCalendar from "../components/shifts/SelectableCalendar";




const Shifts = () => {
	return (

        <div id="main" className="Content">
            <SelectableCalendar/>
      </div>
	);
};

export default Shifts;

