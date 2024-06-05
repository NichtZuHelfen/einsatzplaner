
const SHIFTS = require('../constants/Shifts.json');
    
export function getShiftData(id) {
    return Object.values(SHIFTS).find((obj) => obj.id === id) || {} ;
}