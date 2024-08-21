 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
 import { getFirestore,collection,addDoc,getDocs,doc,deleteDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'

 const firebaseConfig = {
    apiKey: "AIzaSyDKjmJ28jrpzJ7MF5tgFGXfYBI65BQP2Dc",
    authDomain: "todo-exp-b768a.firebaseapp.com",
    projectId: "todo-exp-b768a",
    storageBucket: "todo-exp-b768a.appspot.com",
    messagingSenderId: "1069309297345",
    appId: "1:1069309297345:web:fbcf23ac219884faea8a40",
    measurementId: "G-Z5DGDQ95TY"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const dbGet = getFirestore(app); //conexion a la BD



  import {arrayCompletedTasks} from "./arrays.js";
  import {sortArrayCompletedData} from "./app.js";

  export async function getTask(){
    console.log('get task');
        
        const querySnapshotCompleted = await getDocs(collection(dbGet, "completedTasks"));
        querySnapshotCompleted.forEach((doc) => {
            let objTasks2 = {
                id:             doc.id,
                taskName:       doc.data().taskName,
                exp:            doc.data().exp,
                selectedIcon:   doc.data().selectedIcon,
                date:           doc.data().date,
                dateFinished:   doc.data().dateFinished //es realidad es el satrted
            }
            arrayCompletedTasks.push(objTasks2);
        
        }
        );

        sortArrayCompletedData();
    }//get End Task



 
