 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
 import { getFirestore,collection,addDoc,getDocs,doc,deleteDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
 

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries


 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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




   
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});




const addTaskBtn = document.getElementById('addTaskButton');
addTaskBtn.addEventListener('click', ()=>{
    addTask();
});

function addTask(){
    let id              =   Date.now();
    let taskName        =   document.getElementById('icon_prefix').value;
    let exp             =   document.getElementById('icon_time-exp').value;
    let selectedIcon    =   document.getElementById('selectedIcon').value;
   
    fillTasksTobeDone(id,taskName,exp,selectedIcon);
    
    //FuncionInsertar en la BD

    insertDB(id,taskName,exp,selectedIcon);
    document.getElementById('icon_prefix').value='';
    document.getElementById('icon_time-exp').value='';
}//AddTask


async function insertDB(id,taskName,exp,selectedIcon){
    db.collection("tasks").add({
        id: id,
        taskName: taskName,
        exp: exp,
        selectedIcon, selectedIcon,
        date: Date.now()
    })
    .then((docRef) => {
        displayToast('Task Added');
    })
    .catch((error) => {
        
    });
}




async function insertCompletedTasksDB(taskName,exp,selectedIcon,date){
   
    db.collection("completedTasks").add({
        taskName: taskName,
        exp: exp,
        selectedIcon, selectedIcon,
        date: date
    })
    .then((docRef) => {
        
    })
    .catch((error) => {
        
    });
}


let arrayTask = [];
const querySnapshot = await getDocs(collection(dbGet, "tasks"));
    querySnapshot.forEach((doc) => {
            let objTasks = {
                id:             doc.id,
                taskName:       doc.data().taskName,
                exp:            doc.data().exp,
                selectedIcon:   doc.data().selectedIcon
            }
        arrayTask.push(objTasks);
        
    }
);

function displayToast(test){
    M.toast({html: test})
}


getData();
function getData(){
    arrayTask.forEach(element => {
        fillTasksTobeDone(element.id, element.taskName, element.exp, element.selectedIcon);
    });
}



fillCompletedTasks();
function fillCompletedTasks(){
    let divDate_Container               = document.createElement('div');

    let h5White_texttitles              = document.createElement('h5');
    let divColL6S12                     = document.createElement('div');

    let divColS12M7                     = document.createElement('div');

    let divCardHorizontal               = document.createElement('div');

    let divCardStacked                  = document.createElement('div');



}


function fillTasksTobeDone(id,taskName,exp,selectedIcon){

    let taskToBeDone            = document.getElementById('tasksToBeDone');


    let divColS12M4             = document.createElement('div');
    divColS12M4.classList.add('col', 's12', 'm4');



    let divIcon_BlockCard_Task  = document.createElement('div');
    divIcon_BlockCard_Task.classList.add('icon-block', 'card-task');   



    let h2CenterLight_blue_text = document.createElement('h2');
    h2CenterLight_blue_text.classList.add('center', 'light-blue-text');

    let iMaterial_icons         = document.createElement('i');
    iMaterial_icons.classList.add('material-icons');


    let icon='';

    if(selectedIcon == '1'){
        icon='local_pizza';
    }


    if(selectedIcon == '2'){
        icon='directions_bike';
    }


    if(selectedIcon == '3'){
        icon='insert_emoticon';
    }


    if(selectedIcon == '4'){
        icon='accessibility';
    }

    if(selectedIcon == '5'){
        icon='shopping_cart';
    }


    if(selectedIcon == '6'){
    icon='attach_money';
    }





    iMaterial_icons.innerText=icon;//AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII

    let h5CenterTitles          = document.createElement('h5');
    h5CenterTitles.classList.add('center', 'titles');
    h5CenterTitles.innerText=taskName;

    let divCard_Task_Buttons    = document.createElement('div');
    divCard_Task_Buttons.classList.add('card-task-buttons');

    let aDone                   = document.createElement('a');
    aDone.classList.add('waves-effect','waves-light','btn-small');
    aDone.innerText='Done';
    aDone.setAttribute('id', id);
    aDone.setAttribute('taskName', taskName);
    aDone.setAttribute('exp', exp);
    aDone.setAttribute('selectedIcon', selectedIcon);
    aDone.setAttribute('date', Date.now());
    aDone.addEventListener('click', (evt) =>{
        taskCompleted(evt);
    });

    let iDone = document.createElement('i');
    iDone.classList.add('material-icons', 'right');
    iDone.innerText='check_box';


    let aCancel                 = document.createElement('a');
    aCancel.classList.add('waves-effect','waves-light','btn-small', 'red');
    aCancel.innerText='Cancel';
    aCancel.setAttribute('id', id);

    aCancel.addEventListener('click', (evt) =>{
        taskCanceled(evt);
    });

    let iCancel = document.createElement('i');
    iCancel.classList.add('material-icons', 'right');
    iCancel.innerText = 'cancel';

    let p                       = document.createElement('p');
    p.classList.add('light', 'tektur');
    p.innerText = `${exp} EXP`; //AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII



    //////////////////////////////  Agrega los 'i' a los 'a'
    aDone.appendChild(iDone);
    aCancel.appendChild(iCancel);

    divCard_Task_Buttons.appendChild(aDone);
    divCard_Task_Buttons.appendChild(aCancel);

    h2CenterLight_blue_text.appendChild(iMaterial_icons);

    divIcon_BlockCard_Task.appendChild(h2CenterLight_blue_text);
    divIcon_BlockCard_Task.appendChild(h5CenterTitles);
    divIcon_BlockCard_Task.appendChild(divCard_Task_Buttons);
    divIcon_BlockCard_Task.appendChild(p);


    divColS12M4.appendChild(divIcon_BlockCard_Task);

    taskToBeDone.appendChild(divColS12M4);
}//fillTasksTobeDone





async function taskCompleted(evt){
   
    let idTask = evt.target.id;

    let taskName        = evt.target.getAttribute('taskName');
    let exp             = evt.target.getAttribute('exp');
    let selectedIcon    = evt.target.getAttribute('selectedIcon');
    let date            = evt.target.getAttribute('date');

    console.log('atributes');
    console.log(taskName);
    console.log(exp);
    console.log(selectedIcon);
    console.log(date);
    
    await deleteDoc(doc(dbGet, "tasks", idTask));
    insertCompletedTasksDB(taskName, exp, selectedIcon, date);
    //insertCompletedTasksDB*();

}/// taskCompleted





async function taskCanceled(evt){
    let idTask = evt.target.id;
    await deleteDoc(doc(dbGet, "tasks", idTask));
}
