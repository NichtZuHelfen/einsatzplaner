
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


export async function getEvent(docID) {
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