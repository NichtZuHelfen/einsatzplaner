import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

export function minutesToDurationString(mins) {

    var hours = Math.trunc(mins / 60);
    var minutes = mins - hours * 60;

    if (hours < 10) 
        hours = '0' + hours;
    if (minutes < 10) 
        minutes = '0' + minutes;

    return `${hours}:${minutes}`;
}


export function calculateWorkingDuration(endDate, startDate, breakDuration) {
    const diff = (endDate - startDate) / 1000 / 60 - breakDuration ;
    var hours = Math.trunc(diff / 60);
    if (hours < 10) hours = "0" + hours;
    var minutes = diff - hours * 60;
    if (minutes < 10) minutes = "0" + minutes;

    return `${hours}:${minutes}`;
}

export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export function formatTime(date) {
    var d = new Date(date),
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes()
    if (hours.length < 2) 
        hours = '0' + hours;
    if (minutes.length < 2) 
        minutes = '0' + minutes;

    return [hours, minutes].join(':');
}

export function generatePDF(htmlElement, pdfName) {
    console.log(htmlElement + " " + pdfName);
    const input = htmlElement;
    html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        let position = heightLeft;

        pdf.save(pdfName + ".pdf");
    })
};