
import { db } from "./FirebaseConfig.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


const eventsCollection = collection(db, "events");

export async function getEvents() {
  const data = await getDocs(eventsCollection);
  const events = data.docs.map((doc) => doc.data());
  console.log("geEvents:");
  console.log(events);
    return events.map((event) => { return {...event, start: event.start.toDate(), end: event.end.toDate()} });
}


export function addEvent(event) {
    addDoc(eventsCollection, event);
}