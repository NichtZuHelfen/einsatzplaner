
import { breakDurationStringToMinutes, convertTimestampObjectToDate, convertTimestampObjectToTime } from "../logic/Utils.js";
import { db } from "./FirebaseConfig.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";


// Shifts
const eventsCollection = collection(db, "events");

export async function getEvents() {
  const data = await getDocs(eventsCollection);
  const events = data.docs.map((doc) => {
    var data = doc.data();
    data.docID = doc.id;

    return data;
  });
    return events.map((event) => { return {...event, start: event.start.toDate(), end: event.end.toDate()} });
}


export async function addEvent(event) {
  const addedEventDocRef = await addDoc(eventsCollection, event);
  const addedEvent = (await getDoc(addedEventDocRef)).data();
    return {...addedEvent, "docID": addedEventDocRef.id, start: addedEvent.start.toDate(), end: addedEvent.end.toDate()};
}

export async function deleteEvent(event) {

  const data = await getDocs(eventsCollection);
  const toDelete = data.docs.find((doc) => {
    return doc.id === event.docID
  }).ref;

   await deleteDoc(toDelete);
}


// TimeSheet

const workingHoursCollection = collection(db, "workingHours");

export function convertDataFormats(dataObject) {
    dataObject.date = convertTimestampObjectToDate(dataObject.date);
    dataObject.start = dataObject.start? convertTimestampObjectToDate(dataObject.start) : null;
    dataObject.end = dataObject.end? convertTimestampObjectToDate(dataObject.end) : null;

  return dataObject;
}

export async function getWorkingHours() {
  const data = await getDocs(workingHoursCollection);
  const workingHours = data.docs.map((doc) => {
    var data = doc.data();
    data.docID = doc.id;

    return convertDataFormats(data);
  });
  return workingHours;
}

export async function addWorkingHours(dataObject) {
  const addedEventDocRef = await addDoc(workingHoursCollection, dataObject);
  const addedEvent = (await getDoc(addedEventDocRef)).data();
  return {...addedEvent, "docID": addedEventDocRef.id};
}


export async function updateWorkingHours(docID, dataObject) {
  const dbDoc = doc(db, "workingHours", docID);
  updateDoc(dbDoc, dataObject);
}

export async function deleteWorkingHours(docID) {
  console.log(docID);
  const dbDoc = doc(db, "workingHours", docID);
  deleteDoc(dbDoc);
}