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
  import {fillTasksTobeDone, getCompletedData, getData, getToday, insertNewDay, monthExp, insertIwon} from "./app.js";

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



    export async function insertDBStarted(id,taskName,exp,selectedIcon,timeStart,dba){
        db.collection(dba).add({
            id: id,
            taskName: taskName,
            exp: exp,
            selectedIcon, selectedIcon,
            date: Date.now(),
            timeStart: timeStart,
            avance: "25"

        })
        .then((docRef) => {
            displayToast('Task Added');
        })
        .catch((error) => {
            
        });
    }


    export async function insertCompletedTasksDB(taskName,exp,selectedIcon,date,dateFinished){
            
        db.collection("completedTasks").add({
            taskName: taskName,
            exp: exp,
            selectedIcon, selectedIcon,
            date: date,
            dateFinished:dateFinished
        })
        .then((docRef) => {
            
        })
        .catch((error) => {
            
        });

        
    }


    export function addNegativeTask(evt){
        let taskName = evt.target.textContent.trim();
        let exp = evt.target.nextElementSibling.innerText;
        let now = Date.now().toString();
        insertCompletedTasksDB(taskName, exp, 8, now, now);
        displayToast(taskName)
    }


    export function addIwon(evt){
        let taskName = evt.target.textContent.trim();
        let times = evt.target.nextElementSibling.innerText;
        times = Number(times);
        times++;
        insertIwon(taskName, times);
        displayToast("Felicidades")
    }






    export async function insertNegativeCompletedTasksDB(taskName,exp,selectedIcon,date,dateFinished){
            
        db.collection("completedTasks").add({
            taskName: taskName,
            exp: exp,
            selectedIcon, selectedIcon,
            date: date,
            dateFinished:dateFinished
        })
        .then((docRef) => {
            
        })
        .catch((error) => {
            
        });

        
    }


    export async function taskCompleted(evt,dbDelete,isDomestic){
        console.log(evt.target);
        
        let idTask = evt.target.id;

        let taskName        = evt.target.getAttribute('taskName');
        let exp             = evt.target.getAttribute('exp');
        let selectedIcon    = evt.target.getAttribute('selectedIcon');
        let date            = evt.target.getAttribute('date');
        let dateFinshed     = evt.target.getAttribute('dateFinished'); //posible undefineded

        if(isDomestic){

        }else{
            await deleteDoc(doc(dbGet, dbDelete, idTask));
        }
                        
       

        let pTotalExp = Number(document.getElementById('logo-container').innerText);
   
        insertNewDay(pTotalExp+Number(exp),monthExp+Number(exp));
        

        insertCompletedTasksDB(taskName, exp, selectedIcon, date, dateFinshed);
        //insertCompletedTasksDB*();
        displayToast('Congrats');
           
        
    }/// taskCompleted



    function displayToast(test){
        //var toastHTML = `<span class="card-panel teal lighten-2">${test}</span>`;
       
        M.toast({html: test, class: "rounded"})
    }


    
    export async function insertDB(id,taskName,exp,selectedIcon,tbaleName){
        db.collection(tbaleName).add({
            id: id,
            taskName: taskName,
            exp: exp,
            selectedIcon, selectedIcon,
            date: Date.now(),
            avance: "0"
        })
        .then((docRef) => {
            displayToast('Task Added');
        })
        .catch((error) => {
            
        });
    }



    export async function taskCanceled(evt,db){
        let idTask = evt.target.id;
        await deleteDoc(doc(dbGet, db, idTask));

        displayToast('Canceling');
    }


    export async function completedTaskCanceled(evt){
        let idTask = evt.target.id;
        await deleteDoc(doc(dbGet, "completedTasks", idTask));

        displayToast('Canceling');


        setTimeout(function() { 
            displayToast('Deleted');
        }, 500);
    }


    export async function insertDailyTasks(taskName,exp,selectedIcon2,date2,table){
        db.collection(table).add({
            taskName: taskName,
            exp: exp,
            selectedIcon: selectedIcon2,
            date: date2,
            avance: 0
        })
        .then((docRef) => {
            displayToast(`${taskName} Added`);
        })
        .catch((error) => {
        });
    }//insertDayliTaks


    export function addTask(){
        let id              =   Date.now();
        let taskName        =   document.getElementById('icon_prefix').value;
        let exp             =   document.getElementById('icon_time-exp').value;
        let selectedIcon    =   document.getElementById('selectedIcon').value;
        let frequentTasks   =   document.getElementById('frequentTasks');
        let checkBtn        =   document.getElementById('isDomestic');
        let checkBtnJob        =   document.getElementById('isJob');
        
        let icon_prefix = document.getElementById("icon_prefix");

        icon_prefix.addEventListener("change", (evt) =>{
        icon_prefix.value = frequentTasks.value;
        });

        if(frequentTasks.value!='0'){
            taskName =   icon_prefix.value
        }

        
        ////Aquiiii para agregra domestic task
        if(checkBtn.checked){
             insertDB(id,taskName,exp,selectedIcon,"domesticTasks");
        }else if(checkBtnJob.checked){
            insertDB(id,taskName,exp,selectedIcon,"jobTasks");
        }else{
            fillTasksTobeDone(id,taskName,exp,selectedIcon);
            //FuncionInsertar en la BD
            insertDB(id,taskName,exp,selectedIcon,"tasks");
            document.getElementById('icon_prefix').value='';
            document.getElementById('icon_time-exp').value='';
        } 
    }//AddTask


   



    





    export async function taskStarted(evt,db){
        console.log(db);
        alert('click jeer')
        let taskName = evt.target.getAttribute("taskname");
        let exp = evt.target.getAttribute("exp");
        let icon = evt.target.getAttribute("selectedIcon");
        let date = evt.target.getAttribute("date");           
        let idTask = evt.target.id;
       
        await deleteDoc(doc(dbGet, db, idTask));

        
        displayToast('Task started');
        insertDBStarted(idTask,taskName,exp,icon,date,db);

       
    }




    function sortArrayCompletedData(){

        arrayCompletedTasks.sort(function (b, a) {
            return a.date - b.date;
        });
    
         // Aqui se escoge si byMoth o todas
        
         getCompletedData();
        
    }//sortArrayCompletedData



    export function sortArrayGetData(){
   
        arrayCompletedTasks.sort(function (a, b) {
            return a.taskName - b.taskName;
        });
    
       
        getData();
        getToday(); //Es la funcion para determinar un nuevo dia
    }//


