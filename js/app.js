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


// ********************************************  Variables Globales ***********************************************
let now                     = Date.now();
let today                   = new Date(now)
let lastDay                 = 0; // Se obtiene desde firebase 
let lastDayId               = 0;
let currentMonth            = today.getMonth().toString()+today.getFullYear().toString();
let totalExpCurrentMonth    = 0;
let arrayTask               = [];
let arrayCompletedTasks     = [];
let arrayLastDone           = [
    {name: "Ejercicio", last:0},
    {name: "Lavar Baño", last:0},
    {name: "Lavar Dientes", last:0},
    {name: "Barrer", last:0},
    {name: "Trapear", last:0},
    {name: "Levantarme", last:0},
    {name: "Sin X", last:0},
    {name: "Sin X Talk", last:0},
    {name: "Curso ONE", last:0},
    {name: "Curso Linux", last:0},
    {name: "Mas de 2 horas en el celular", last:0},
]

// Fin Variables Globales 
// **************************************************************** Componentes ******************************************

const addTaskBtn = document.getElementById('addTaskButton');
let datePick = document.getElementById('datePicker');
const getTaskBtn = document.getElementById('getTasks');
let selectFrequent = document.getElementById('frequentTasks');
//  Fin Componentes 
// **************************************************************** Eventos ****************************************** 
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, 'autoclose');
});

addTaskBtn.addEventListener('click', ()=>{
    addTask();
});


getTaskBtn.addEventListener('click', ()=>{
    getTask();
});

selectFrequent.addEventListener( 'change', (evt) => {
    
    let selectExp = document.getElementById('icon_time-exp');
    switch (evt.target.value    ) {
        case 'Bañarme':
            selectExp.value = '10';
        break;

        case 'Barrer':
            selectExp.value = '10';
        break;

        case 'Cenar':
            selectExp.value = '15';
        break;

        case 'Comer':
            selectExp.value = '15';
        break;

        case 'Curso Linux':
            selectExp.value = '30';
        break;


        case 'Desayunar':
            selectExp.value = '15';
        break;

        case 'Ejercicio':
            selectExp.value = '60';
        break;


        case 'Ir A Aurrera':
            selectExp.value = '25';
        break;

        case 'Ir A Waldos':
            selectExp.value = '20';
        break;

        case 'Ir Al Mercado':
            selectExp.value = '25';
        break;


        case 'Lavar Baño':
            selectExp.value = '5';
        break;
        
        case 'Preparar Desayuno':
            selectExp.value = '15';
        break;

        case 'Preparar Comida':
            selectExp.value = '25';
        break;

        case 'Trapear':
            selectExp.value = '5';
        break;


        



        default:
            console.log('Nel');
        break;
    }
    


});//Evento Select Frequent Task

datePick.addEventListener('change', (evt) =>{
    let selectedMonth = new Date(evt.target.value);
    getCompletedData(selectedMonth.getMonth().toString()+selectedMonth.getFullYear().toString());
});
// Fin Eventos 
// **************************************************************** Funciones Eventos ****************************************** 
            function addTask(){
                let id              =   Date.now();
                let taskName        =   document.getElementById('icon_prefix').value;
                let exp             =   document.getElementById('icon_time-exp').value;
                let selectedIcon    =   document.getElementById('selectedIcon').value;
                let frequentTasks   =   document.getElementById('frequentTasks');
                

                if(frequentTasks.value!='0'){
                    taskName = frequentTasks.value;
                }
            
                
                fillTasksTobeDone(id,taskName,exp,selectedIcon);
                
                //FuncionInsertar en la BD


                

                insertDB(id,taskName,exp,selectedIcon);
                document.getElementById('icon_prefix').value='';
                document.getElementById('icon_time-exp').value='';
                
            }//AddTask

            //Completed Tasks
            async function getTask(){
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
            }

            async function taskCompleted(evt){
            
                let idTask = evt.target.id;

                let taskName        = evt.target.getAttribute('taskName');
                let exp             = evt.target.getAttribute('exp');
                let selectedIcon    = evt.target.getAttribute('selectedIcon');
                let date            = evt.target.getAttribute('date');
                let dateFinshed     = evt.target.getAttribute('dateFinished'); //posible undefineded

                
                
                await deleteDoc(doc(dbGet, "tasks", idTask));
                insertCompletedTasksDB(taskName, exp, selectedIcon, date, dateFinshed);
                //insertCompletedTasksDB*();

            

                displayToast('Congrats');

                setTimeout(function() { 
                    reiniciarTaskToBeDone();
                }, 1500);

                setTimeout(function() { 
                    reiniciarCompletedTask();
                }, 1500);


           

            
                
            }/// taskCompleted

            async function taskCanceled(evt){
                let idTask = evt.target.id;
                await deleteDoc(doc(dbGet, "tasks", idTask));

                displayToast('Canceling');


                setTimeout(function() { 
                    reiniciarTaskToBeDone();
                    displayToast('Canceled');
                }, 1000);
            }

            async function completedTaskCanceled(evt){
                let idTask = evt.target.id;
                await deleteDoc(doc(dbGet, "completedTasks", idTask));

                displayToast('Canceling');


                setTimeout(function() { 
                    displayToast('Deleted');
                }, 500);
            }

            async function taskStarted(evt){
                let taskName = evt.target.getAttribute("taskname");
                let exp = evt.target.getAttribute("exp");
                let icon = evt.target.getAttribute("selectedIcon");
                let date = evt.target.getAttribute("date");           
                let idTask = evt.target.id;
               
                await deleteDoc(doc(dbGet, "tasks", idTask));

                
                displayToast('Task started');
                insertDBStarted(idTask,taskName,exp,icon,date);

               
            }



// Fin Eventos Funciones eventos
// **************************************************************** Funciones DB ****************************************** 



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

            async function insertDBStarted(id,taskName,exp,selectedIcon,timeStart){
                db.collection("tasks").add({
                    id: id,
                    taskName: taskName,
                    exp: exp,
                    selectedIcon, selectedIcon,
                    date: Date.now(),
                    timeStart: timeStart

                })
                .then((docRef) => {
                    displayToast('Task Added');
                })
                .catch((error) => {
                    
                });
            }


            async function insertDailyTasks(taskName,exp,selectedIcon2,date2){
                db.collection("tasks").add({
                    taskName: taskName,
                    exp: exp,
                    selectedIcon: selectedIcon2,
                    date: date2
                })
                .then((docRef) => {
                    displayToast(`${taskName} Added`);
                })
                .catch((error) => {
                    console.log(error);
                });
            }//insertDayliTaks



            async function insertNewDay(){
                await deleteDoc(doc(dbGet, "date", lastDayId));
                db.collection("date").add({
                    today: Date.now()
                })
                .then((docRef) => {
                    displayToast('Adding Daily Tasks');
                })
                .catch((error) => {
                    
                });
            }




            async function insertCompletedTasksDB(taskName,exp,selectedIcon,date,dateFinished){
            
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

            //Obtiene Task to do
            const querySnapshot = await getDocs(collection(dbGet, "tasks"));
                querySnapshot.forEach((doc) => {
                        let objTasks = {
                            id:             doc.id,
                            taskName:       doc.data().taskName,
                            exp:            doc.data().exp,
                            selectedIcon:   doc.data().selectedIcon,
                            timeStart:           doc.data().timeStart
                        }
                    arrayTask.push(objTasks);
                    
                }
                
            );


            //Obtiene Current Day
            const queryGetDay = await getDocs(collection(dbGet, "date"));
                queryGetDay.forEach((doc) => {
                    lastDay = doc.data().today;
                    lastDayId = doc.id;
                }
            );



// Fin Funciones DB
// **************************************************************** Funciones Date ****************************************** 
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

            function getHMString(x){
                return String(x).length==1 ? '0' + String(x) : x;
            }//Anade un 'Cero' al princpio a las horas y minutos de un digito: ejemplo convuerte 22:5 en 22:05

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
                    return 'Jueves';
                }

                if(day==5){
                    return 'Viernes';
                }

                if(day==6){
                    return 'Sabado';
                }


            }//getDayString

            function getToday(){
                console.log("im in funcion get today");
                let currentDay = new Date(Date.now());
                let DBCurrentDay = new Date(Number(lastDay));
                if(currentDay.getDate() == DBCurrentDay.getDate()){
                    console.log("Yes same day");
                    console.log(lastDayId);
                }else{
                    console.log("different day");
                    insertNewDay();//aqui mando los datos como argumento
                    

                    setTimeout(function() { 
                        insertDailyTasks("Cenar", "15", "3", Date.now());
                    }, 50);

                    setTimeout(function() { 
                        insertDailyTasks("Comer", "15", "3", Date.now());
                    }, 50);


                    setTimeout(function() { 
                        insertDailyTasks("Desayunar", "15", "3", Date.now());
                    }, 50);

                    setTimeout(function() {  
                        insertDailyTasks("Ejercicio", "60", "3", Date.now());
                    }, 50);

                    setTimeout(function() {  
                        insertDailyTasks("Lavar Dientes", "5", "3", Date.now());
                    }, 50)
                    
                    setTimeout(function() {  
                        insertDailyTasks("Lavar Ropa", "20", "4", Date.now());
                    }, 50);

                    setTimeout(function() {  
                        insertDailyTasks("Lavar Trastes", "15", "4", Date.now());
                    }, 50);

                    setTimeout(function() {  
                        insertDailyTasks("Levantarme", "0", "3", Date.now());
                    }, 50);

                  

                    setTimeout(function() {  
                        insertDailyTasks("Preparar Desayuno", "15", "1", Date.now());
                    }, 50);

                    setTimeout(function() {  
                        insertDailyTasks("Preparar Comida", "25", "1", Date.now());
                    }, 50);

                    setTimeout(function() {  
                        insertDailyTasks("Curso Linux 30 minutos", "30", "5", Date.now());
                    }, 50);

                    setTimeout(function() {  
                        insertDailyTasks("Curso ONE 30 minutos", "30", "5", Date.now());
                    }, 50);

                    setTimeout(function() {  
                        insertDailyTasks("Curso Shell 30 minutos", "30", "7", Date.now());
                    }, 50);

                    setTimeout(function() {  
                        insertDailyTasks("leer correos Shell", "30", "7", Date.now());
                    }, 50);

                }//ELSE

              
            }//GetToday


// Fin FUnciones Date

//Actvidades para registrar last Day
   
// **************************************************************** Funciones Manipular DOM ******************************************
            function displayExp(totalExp,monthTotalExp){
                let pTotalExp = document.getElementById('completedTask');
                pTotalExp.innerText = ` ${totalExp} Exp`

                let pTotalMonthExp = document.getElementById('completedMonthTask');
                pTotalMonthExp.innerText = `Completed This Month - ${monthTotalExp} XP`;
                
            }


            function taskActivityLog(){
                let i = 0;
                arrayLastDone.forEach(element => {
                    console.log("for each activity log");
                    console.log(element);

                    //Aqui se soluciona el bug para las fechas que se repiten en la lista
                    let last = new Date(Number(arrayLastDone[i].last))
                    let li = document.createElement("li");
                    li.classList.add("titles", "daysWD");
                    li.innerText=`${element.name} - ${last.getDate()} ${getMonthString(last.getMonth())} ${last.getFullYear()} ${getHMString(last.getHours())}:${getHMString(last.getMinutes())}`;
                    let listDaysWD = document.getElementById("listDaysWD");
                    listDaysWD.appendChild(li);
                    i++;
                });
                
            }


            function fillLastDone(id,taskName,exp,selectedIcon,dateStarted,date){
                if(taskName=="Ejercicio"){
                    console.log(arrayLastDone[0].last);
                    if(dateStarted>arrayLastDone[0].last){
                        arrayLastDone[0].last=dateStarted;
                    }
                
                }

                if(taskName=="Ejercicio"){
                    console.log(arrayLastDone[0].last);
                    if(dateStarted>arrayLastDone[0].last){
                        arrayLastDone[0].last=dateStarted;
                    }
                
                }

                //Hay un arreglo deobjetos al inicio llenar tarea ahi tambien
                if(taskName=="Lavar Baño"){
                    console.log(arrayLastDone[1].last);
                    if(dateStarted>arrayLastDone[1].last){
                        arrayLastDone[1].last=dateStarted;
                    }
                
                }

                if(taskName=="Lavar Dientes"){
                    console.log(arrayLastDone[2].last);
                    if(dateStarted>arrayLastDone[2].last){
                        arrayLastDone[2].last=dateStarted;
                    }
                
                }

                if(taskName=="Barrer"){
                    console.log(arrayLastDone[3].last);
                    if(dateStarted>arrayLastDone[3].last){
                        arrayLastDone[3].last=dateStarted;
                    }
                
                }


                if(taskName=="Trapear"){
                    console.log(arrayLastDone[4].last);
                    if(dateStarted>arrayLastDone[4].last){
                        arrayLastDone[4].last=dateStarted;
                    }
                
                }


                            
                if(taskName.includes("Levantarme")){
                    console.log(arrayLastDone[5].last);
                    console.log("exp aquiiii");
                    console.log(exp);
                    let a = Number(exp);
                    console.log(typeof a);
                    console.log(a);
            
                    if(a<0){
                        if(dateStarted>arrayLastDone[5].last){
                            arrayLastDone[5].last=dateStarted;
                        }
                    }
                    
                
                }


                if(taskName.includes("X")){
                    if(dateStarted>arrayLastDone[6].last){
                        arrayLastDone[6].last=dateStarted;
                    }
                }

                if(taskName.includes("Talk")){
                    if(dateStarted>arrayLastDone[7].last){
                        arrayLastDone[7].last=dateStarted;
                    }
                }
            
                if(taskName.includes("Curso ONE")){
                    console.log(arrayLastDone[8].last);
                    if(dateStarted>arrayLastDone[8].last){
                        arrayLastDone[8].last=dateStarted;
                    }
                
                }

                if(taskName.includes("Curso Linux")){
                    console.log(arrayLastDone[9].last);
                    if(dateStarted>arrayLastDone[9].last){
                        arrayLastDone[9].last=dateStarted;
                    }
                
                }


                            
                if(taskName.includes("Horas en el celular")){
                    console.log(arrayLastDone[10].last);
                    console.log("exp aquiiii");
                    console.log(exp);
                    let a = Number(exp);
                    console.log(typeof a);
                    console.log(a);
            
                    if(a<0){
                        if(dateStarted>arrayLastDone[10].last){
                            arrayLastDone[10].last=dateStarted;
                        }
                    }
                    
                
                }

                
            }

            function fillCompletedTasks(id,taskName,exp,selectedIcon,dateStarted,date){
            
                // AQUI solo llenar la uultima fecha, el metodo append debe estar fuera de aqui para que solo hay una "LI" por actividad
               



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
                                        
                                        let timestamp = new Date(Number(dateStarted));
                                        pPx.innerText=`${getDayString(timestamp.getDay())} ${timestamp.getDate()} ${ getMonthString(timestamp.getMonth())} ${timestamp.getFullYear()} - ${getHMString(timestamp.getHours())}:${getHMString(timestamp.getMinutes())}h`;
                                        //Date
                                            let iMaterial_Icons                         = document.createElement('i');
                                            iMaterial_Icons.classList.add('material-icons');
                                            iMaterial_Icons.innerText=getSelectedIcon(selectedIcon);

                                            let iMaterial_IconsX                         = document.createElement('i');
                                            iMaterial_IconsX.classList.add('material-icons',"red-text", "icon-delete-completed-task");
                                            iMaterial_IconsX.innerText=getSelectedIcon("9");
                                            iMaterial_IconsX.setAttribute("id", id );

                                            iMaterial_IconsX.addEventListener('click', (evt) =>{
                                                completedTaskCanceled(evt);
                                            });

                                        
                                            



                                    let divCard_content                  = document.createElement('div');
                                    divCard_content.classList.add('card-content');
                                    

                                        let pTitles                                     = document.createElement('p');
                                        pTitles.classList.add('titles');

                                        console.log("eval");    
                                        let startDate = new Date(Number(date));
                                       
                                        pTitles.innerText=`${taskName} -- ${startDate.getDate()} at ${getHMString(startDate.getHours())}: ${getHMString(startDate.getMinutes())}h`;


                                    let divCard_content2                  = document.createElement('div');
                                    divCard_content2.classList.add('card-content', 'titles-completed');
                                        let pLight                                     = document.createElement('p');
                                        pLight.classList.add('p','tektur');
                                    
                                    
                                    
                                        
                                        pLight.innerText=`${exp} px`;
                                        



                                divCard_content2.appendChild(pLight);
                                divCard_content.appendChild(pTitles);
                                
                                //divCard_content.appendChild(pTitles);


                                
                                //pLight.appendChild(iMaterial_Icons);
                                divCard_expIcon_block.appendChild(pPx);


                                divCard_content2.appendChild(iMaterial_IconsX);
                                divCard_content2.appendChild(iMaterial_Icons);
                                

                                
                                divCardStacked.appendChild(divCard_content2);
                                divCardStacked.appendChild(divCard_content);
                                divCardStacked.appendChild( divCard_expIcon_block);
                            

                                divCardHorizontal.appendChild(divCardStacked);
                                divColS12M7.appendChild(divCardHorizontal);
                                divColL6S12.appendChild(divColS12M7);


                                divDate_Container.appendChild(h5White_texttitles);
                                divDate_Container.appendChild(divColL6S12);
                            
                                if(taskName=='x' || taskName=='X'){
                                    pTitles.classList.add('red-text');
                                    pPx.classList.add('red-text');
                                    pLight.classList.add('red-text');
                                    iMaterial_Icons.classList.add('red-text');
                                }

                                
                                
                                if(taskName=='Ejercicio'){
                                    pTitles.classList.add('blue-text');
                                    pPx.classList.add('blue-text');
                                    pLight.classList.add('blue-text');
                                    iMaterial_Icons.classList.add('blue-text');
                                }

                                if(taskName=='Lavar Dientes'){
                                    pTitles.classList.add('blue-text');
                                    pPx.classList.add('blue-text');
                                    pLight.classList.add('blue-text');
                                    iMaterial_Icons.classList.add('blue-text');
                                }


                                if(taskName.includes("X") && Number(exp)<0){
                                    pTitles.classList.add('red-text');
                                    pPx.classList.add('red-text');
                                    pLight.classList.add('red-text');
                                    iMaterial_Icons.classList.add('red-text');
                                }

            }// fillCompletedTasks

            function reiniciarTaskToBeDone(){  // Cuando se Finaliza o Cancela una task
                let taskToBeDone            = document.getElementById('tasksToBeDone');
                while (taskToBeDone.firstChild) {
                    taskToBeDone.removeChild(taskToBeDone.firstChild);
                }
                console.log('entre a normal');
                getData();
            }

            function reiniciarCompletedTask(){  
                console.log('Reiniciando');
                let taskToBeDone            = document.getElementById('dateContainer');
                while (taskToBeDone.firstChild) {
                    taskToBeDone.removeChild(taskToBeDone.firstChild);
                }
                console.log('Entre a completed tasks');
                
            }

            function fillTasksTobeDone(id,taskName,exp,selectedIcon,date,dateStarted){

                
                let taskToBeDone            = document.getElementById('tasksToBeDone');
                

                let divColS12M4             = document.createElement('div');
                divColS12M4.classList.add('col', 's12', 'm4');
                



                let divIcon_BlockCard_Task  = document.createElement('div');
                divIcon_BlockCard_Task.classList.add('icon-block', 'card-task');   



                let h2CenterLight_blue_text = document.createElement('h2');
                h2CenterLight_blue_text.classList.add('center', 'light-blue-text');

                let iMaterial_icons         = document.createElement('i');
                iMaterial_icons.classList.add('material-icons');


                let iMaterial_iconsStart         = document.createElement('i');
                iMaterial_iconsStart.classList.add('material-icons');


                let icon=getSelectedIcon(selectedIcon);


                iMaterial_icons.innerText=icon;//AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
                iMaterial_iconsStart.innerText=getSelectedIcon("10");

              

                if(date!=undefined){
                    iMaterial_iconsStart.innerText=getSelectedIcon("11");
                }else{
                    iMaterial_iconsStart.innerText=getSelectedIcon("10");
                }

                iMaterial_iconsStart.classList.add("start-task", "blue-text");

                iMaterial_iconsStart.setAttribute('id', id);
                iMaterial_iconsStart.setAttribute('taskName', taskName);
                iMaterial_iconsStart.setAttribute('exp', exp);
                iMaterial_iconsStart.setAttribute('selectedIcon', selectedIcon);
                iMaterial_iconsStart.setAttribute('date', Date.now());

                iMaterial_iconsStart.addEventListener('click', (evt) =>{
                    taskStarted(evt);
                });

               

        

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
                aDone.setAttribute('dateFinished', date);
                aDone.addEventListener('click', (evt) =>{
                    taskCompleted(evt);
                });

                let iDone = document.createElement('i');
                iDone.classList.add('material-icons', 'right');
                iDone.innerText='check_box';

                ///////////////////////////////////////////////////////////////////////////////////////////// Evento
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

                divIcon_BlockCard_Task.appendChild(iMaterial_iconsStart);
                divIcon_BlockCard_Task.appendChild(h2CenterLight_blue_text);
                divIcon_BlockCard_Task.appendChild(h5CenterTitles);
                divIcon_BlockCard_Task.appendChild(divCard_Task_Buttons);
                divIcon_BlockCard_Task.appendChild(p);

                console.log("SERA RED");
                console.log(selectedIcon);
                if( selectedIcon==="11"){
                    iMaterial_iconsStart.classList.add("red-text");
                    console.log("IIITTTT SSSS REEED");
                }

                divColS12M4.appendChild(divIcon_BlockCard_Task);

                taskToBeDone.appendChild(divColS12M4);
            }//fillTasksTobeDone

            function displayToast(test){
                //var toastHTML = `<span class="card-panel teal lighten-2">${test}</span>`;
               
                M.toast({html: test, class: "rounded"})
            }
// Fin Funciones Manipular DOM


sortArrayGetData();
function sortArrayGetData(){
   
    arrayCompletedTasks.sort(function (a, b) {
        return a.taskName - b.taskName;
    });

   
    getData();
    getToday(); //Es la funcion para determinar un nuevo dia
}//

function getData(){
    
    
    
    let totalPendingTask = document.getElementById('totalPendingTask');
    totalPendingTask.classList.add('blue-text');
    totalPendingTask.innerText = `${arrayTask.length}`
    
    arrayTask.forEach(element => {
        console.log("GetData");
        console.log(element);
        fillTasksTobeDone(element.id, element.taskName, element.exp, element.selectedIcon,element.timeStart);
        
    });
}


//Codigo Ordenar Array
function sortArrayCompletedData(){

    arrayCompletedTasks.sort(function (b, a) {
        return a.date - b.date;
    });

     // Aqui se escoge si byMoth o todas
    
     getCompletedData();
    
}//sortArrayCompletedData


function getCompletedData(month){
    //byMonth trae el mes que mostrara

    let totalExp=0; // Este esta aqui por el momento pero deberia estar en su propio metodo porque calcula la EXP total
    if(month===undefined){
        arrayCompletedTasks.forEach(element => {
            totalExp+=Number(element.exp); //Aqui hace la suma independientemente del mes
            let taskMonth = new Date(Number(element.date));
            fillLastDone(element.id, element.taskName, element.exp, element.selectedIcon, element.date, element.dateFinished);
            if(currentMonth==taskMonth.getMonth().toString()+taskMonth.getFullYear().toString()){
                totalExpCurrentMonth+=Number(element.exp);
                fillCompletedTasks(element.id, element.taskName, element.exp, element.selectedIcon, element.date, element.dateFinished);
            }
        });
    }else{
        reiniciarCompletedTask();
        arrayCompletedTasks.forEach(element => {
            totalExp+=Number(element.exp); //Aqui hace la suma independientemente del mes
            let taskMonth = new Date(Number(element.date));
            if(month==taskMonth.getMonth().toString()+taskMonth.getFullYear().toString()){
                totalExpCurrentMonth+=Number(element.exp);
                fillCompletedTasks(element.id, element.taskName, element.exp, element.selectedIcon, element.date, element.dateFinished);
            }else{
            console.log('no');
        }
        });

    }

    
    displayExp(totalExp,totalExpCurrentMonth);
    totalExpCurrentMonth=0;
    taskActivityLog();
    
   
}//GetcompletedData







function getSelectedIcon(selectedIcon){
         

    

    if(selectedIcon == '1'){
        return 'restaurant';
    }


    if(selectedIcon == '2'){
        return 'insert_emoticon';//exercise  
    }


    if(selectedIcon == '3'){
        return 'favorite';//Havin fun
    }

    
    if(selectedIcon == '4'){
        return 'home';
    }

    if(selectedIcon == '5'){ //personal projectas
        return 'computer';
    }


    if(selectedIcon == '6'){ //shopping
        return 'shopping_cart';
    }


    if(selectedIcon == '7'){ //job
        return 'attach_money';
    }

    if(selectedIcon == '8'){
        return 'do_not_disturb_alt';
    }

    if(selectedIcon == '9'){  // X
        return 'close';
    }

    if(selectedIcon == '10'){ 
        return 'play_arrow';
    }


    if(selectedIcon == '11'){
        return 'hourglass_full';
    }



}// getselectedIcon
