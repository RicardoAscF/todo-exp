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
let arrayCompletedTasks = [];
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


const querySnapshotCompleted = await getDocs(collection(dbGet, "completedTasks"));
    querySnapshotCompleted.forEach((doc) => {
            let objTasks2 = {
                id:             doc.id,
                taskName:       doc.data().taskName,
                exp:            doc.data().exp,
                selectedIcon:   doc.data().selectedIcon,
                date:           doc.data().date
            }
        arrayCompletedTasks.push(objTasks2);
        
    }
);



getData();
getCompletedData();
function getData(){
    
    arrayTask.forEach(element => {
        fillTasksTobeDone(element.id, element.taskName, element.exp, element.selectedIcon);
    });
}


function sortArrayCompletedData(){
    console.log('Sorting...');
    
}



function getCompletedData(){
    console.log(arrayCompletedTasks.length);
    arrayCompletedTasks.forEach(element => {
        fillCompletedTasks(element.id, element.taskName, element.exp, element.selectedIcon, element.date);
    });
}







function displayToast(test){
    M.toast({html: test})
}







function fillCompletedTasks(id,taskName,exp,selectedIcon,date){
  

    let divDate_Container               = document.getElementById('dateContainer');
    divDate_Container.classList.add('date-container');
    
  

        let h5White_texttitles              = document.createElement('h5');// Date Lunes
        h5White_texttitles.classList.add('white-text', 'titles');/////Aqui va la logica del acomodo respecto a fechas
       

        let divColL6S12                     = document.createElement('div');
        divColL6S12.classList.add('col', 'l6', 's12');

            let divColS12M7                     = document.createElement('div');
            divColS12M7.classList.add('col', 's12', 'm7');

                let divCardHorizontal               = document.createElement('div');
                divCardHorizontal.classList.add('card', 'horizontal');

                    let divCardStacked                  = document.createElement('div');
                    divCardStacked.classList.add('card-stacked');

                        let divCard_expIcon_block                  = document.createElement('div');
                        divCard_expIcon_block.classList.add('card-exp', 'icon-block');

                            let pPx                                 = document.createElement('p');
                            pPx.classList.add('titles');
                            let timestamp = new Date(Number(date));
                            pPx.innerText=`Finished on: ${getDayString(timestamp.getDay()) } ${timestamp.getDate()  } ${ getMonthString(timestamp.getMonth())} ${timestamp.getFullYear()}    `;
                          

                                let iMaterial_Icons                         = document.createElement('i');
                                iMaterial_Icons.classList.add('material-icons');
                                iMaterial_Icons.innerText=getSelectedIcon(selectedIcon);

                            
                                



                        let divCard_content                  = document.createElement('div');
                        divCard_content.classList.add('card-content');
                        

                            let pTitles                                     = document.createElement('p');
                            pTitles.classList.add('titles');
                            pTitles.innerText=taskName;


                        let divCard_content2                  = document.createElement('div');
                        divCard_content2.classList.add('card-content', 'titles-completed');
                            let pLight                                     = document.createElement('p');
                            pLight.classList.add('p','tektur');
                          
                        
                        
                            
                            pLight.innerText=`${exp} px`;
                            



                    divCard_content2.appendChild(pLight);//Fecha
                    divCard_content.appendChild(pTitles);
                    
                    //divCard_content.appendChild(pTitles);


                    
                    //pLight.appendChild(iMaterial_Icons);
                    divCard_expIcon_block.appendChild(pPx);



                    divCard_content2.appendChild(iMaterial_Icons);

                    
                    divCardStacked.appendChild(divCard_content2);
                    divCardStacked.appendChild(divCard_content);
                    divCardStacked.appendChild( divCard_expIcon_block);
                   

                    divCardHorizontal.appendChild(divCardStacked);
                    divColS12M7.appendChild(divCardHorizontal);
                    divColL6S12.appendChild(divColS12M7);


                    divDate_Container.appendChild(h5White_texttitles);
                    divDate_Container.appendChild(divColL6S12);
                   
                   





}// fillCompletedTasks


function getMonthString(month){

    if(month==0){
        return 'Enero';
    }


    if(month==1){
        return 'Febrero';
    }

    if(month==2){
        return 'Marzo';
    }

    if(month==3){
        return 'Abril';
    }

    if(month==4){
        return 'Mayo';
    }

    if(month==5){
        return 'Junio';
    }


    if(month==6){
        return 'Julio';
    }

    if(month==7){
        return 'Agosto';
    }


    if(month==8){
        return 'Septiembre';
    }

    if(month==9){
        return 'Octubre';
    }

    if(month==10){
        return 'Noviembre';
    }

    if(month==11){
        return 'Diciembre';
    }

}//getMothString


function getDayString(day){
    if(day==0){
        return 'Domingo';
    }


    if(day==1){
        return 'Lunes';
    }

    if(day==2){
        return 'Martes';
    }

    if(day==3){
        return 'Miercoles';
    }

    if(day==4){
        return 'Juevesa';
    }

    if(day==5){
        return 'Viernes';
    }

    if(day==6){
        return 'Sabado';
    }


}//getDayString



//Terminar Card con JS
// Primero crear metodo para anadir tarea terminada a la lista (sin BD)
// LLnear Datos desde la BD al cargar pagina


function reiniciarTaskToBeDone(){  // Cuando se Finaliza o Cancela una task
    let taskToBeDone            = document.getElementById('tasksToBeDone');
    while (taskToBeDone.firstChild) {
        taskToBeDone.removeChild(taskToBeDone.firstChild);
    }
    console.log('entre a normal');
    getData();
}



function reiniciarCompletedTask(){  // Cuando se Finaliza o Cancela una task
    let taskToBeDone            = document.getElementById('dateContainer');
    while (taskToBeDone.firstChild) {
        taskToBeDone.removeChild(taskToBeDone.firstChild);
    }
    console.log('Entre a completed tasks');
    getCompletedData();
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


    let icon=getSelectedIcon(selectedIcon);


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




function getSelectedIcon(selectedIcon){
         

    

    if(selectedIcon == '1'){
        return 'restaurant';
    }


    if(selectedIcon == '2'){
        return 'directions_bike';
    }


    if(selectedIcon == '3'){
        return 'insert_emoticon';
    }

    
    if(selectedIcon == '4'){
        return 'today';
    }

    if(selectedIcon == '5'){
        return 'computer';
    }


    if(selectedIcon == '6'){
        return 'shopping_cart';
    }


    if(selectedIcon == '7'){
        return 'attach_money';
    }



}// getselectedIcon





async function taskCompleted(evt){
   
    let idTask = evt.target.id;

    let taskName        = evt.target.getAttribute('taskName');
    let exp             = evt.target.getAttribute('exp');
    let selectedIcon    = evt.target.getAttribute('selectedIcon');
    let date            = evt.target.getAttribute('date');

    
    
    await deleteDoc(doc(dbGet, "tasks", idTask));
    insertCompletedTasksDB(taskName, exp, selectedIcon, date);
    //insertCompletedTasksDB*();

   

    displayToast('Congrats');
    setTimeout(function() { 
        reiniciarTaskToBeDone();
        reiniciarCompletedTask();
    }, 1500);

    fillCompletedTasks(idTask,taskName, exp, selectedIcon, date);

    
}/// taskCompleted



async function taskCanceled(evt){
    let idTask = evt.target.id;
    await deleteDoc(doc(dbGet, "tasks", idTask));

    displayToast('Canceling');


    setTimeout(function() { 
        reiniciarTaskToBeDone();
        displayToast('Canceled');
    }, 1500);
}
