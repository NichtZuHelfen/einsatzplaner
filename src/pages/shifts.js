// Filename - pages/about.js


import React from "react";

import SelectableCalendar from '../components/SelectableCalendar.js';
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/de';




const Shifts = () => {
	const localizer = momentLocalizer(moment);
	return (
		
        <div id="main" className="Content">
          <SelectableCalendar
              localizer={localizer}
          />
      </div>
	);
};

export default Shifts;

