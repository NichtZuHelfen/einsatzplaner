
const SHIFTS = require('../constants/Shifts.json');
    
export function getShiftData(id) {
    return Object.values(SHIFTS).find((obj) => obj.shiftID === id) || {} ;
}

export function convertTimestampObjectToDate (timestamp) {
    const millis = timestamp.seconds * 1000;
    return new Date(millis);
}


export function breakDurationStringToMinutes(breakDuration) {
    const hours = Number.parseInt(breakDuration.slice(0, 2)) * 60;
    const minutes = Number.parseInt(breakDuration.slice(3, 5));

    return hours + minutes;
}


export function calculateWorkingDuration(endDate, startDate, breakDuration) {
    const diff = (endDate - startDate) / 1000 / 60 - breakDuration ;
    var hours = Math.trunc(diff / 60);
    if (hours < 10) hours = "0" + hours;
    var minutes = diff - hours * 60;
    if (minutes < 10) minutes = "0" + minutes;
    
    return `${hours}:${minutes}`;
}