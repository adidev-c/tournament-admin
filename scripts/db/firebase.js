import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getDatabase, ref, set, get, child, push } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyB9ACEsLDEsech23PHoWJjMczUxGdhgIO0",
  authDomain: "football-tournament-450f7.firebaseapp.com",
  databaseURL: "https://football-tournament-450f7-default-rtdb.firebaseio.com",
  projectId: "football-tournament-450f7",
  storageBucket: "football-tournament-450f7.firebasestorage.app",
  messagingSenderId: "290746425903",
  appId: "1:290746425903:web:ffc466ee25891287b05cda",
  measurementId: "G-W0M336Y6S4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);

//seting data for a key
export function set_data(ref, data) {
  set(ref, data);
}
//pushing data to a list
export function push_data(ref, data) {
  push(ref, data)
    .then(() => {
      console.log("New match added successfully!");
    })
    .catch((error) => {
      console.error("Error adding new match: ", error);
    });
}
//geting data for a key
export function get_data(ref) {
  return get(ref)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Data:", snapshot.val());
        return snapshot.val();
      } else {
        console.log("No data at path.");
        return {};
      }
    })
    .catch((error) => {
      console.error("Read error:", error);
      return {};
    });
}

//export refs
export const head = ref(db, "Live")
export const live = ref(db, "Live/live")
export const past = ref(db, "Live/past")
export const status = ref(db, "Live/status")
export const teams = ref(db, "Live/teams")
export const team_a = ref(db, "Live/live/teama")
export const team_b = ref(db, "Live/live/teamb")
export const a_score = ref(db, "Live/live/teama/score")
export const b_score = ref(db, "Live/live/teamb/score")
export const a_name = ref(db, "Live/live/teama/name")
export const b_name = ref(db, "Live/live/teamb/name")
export const a_status = ref(db, "Live/live/teama/status")
export const b_status = ref(db, "Live/live/teamb/status")