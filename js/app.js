 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
 import { getFirestore,collection,addDoc,getDocs,doc,deleteDoc,updateDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
 
 
 import {getDayString,getSelectedIcon, getMonthString} from "./classSwitch.js";
 import { arrayDailyTasks, arrayLastDone, arrayCompletedTasks } from "./arrays.js";
 import { addNegativeTask, addIwon ,getTask, taskCompleted,taskCanceled, completedTaskCanceled, insertDailyTasks, addTask, taskStarted, sortArrayGetData} from "./db.js";



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
let diasSeguidosId               = 0;

let currentMonth            = today.getMonth().toString()+today.getFullYear().toString();
let totalExpCurrentMonth    = 0;
let arrayTask               = [];
let arrayDomesticTask       = [



    {taskName: "Afeitarme",exp:"10",selectedIcon:"3",date: Date.now()},
    {taskName: "Bañarme",exp:"5",selectedIcon:"3",date: Date.now()},
    {taskName: "Clase Flauta",exp:"30",selectedIcon:"12",date: Date.now()},

    {taskName: "Cumpli + de 2 días sin ejercicio",exp:"-50",selectedIcon:"3",date: Date.now()},
    {taskName: "Cumpli + de 2 días sin meditar",exp:"-50",selectedIcon:"12",date: Date.now()},

    {taskName: "Curso Linux 30 minutos",exp:"30",selectedIcon:"5",date: Date.now()},
    
    {taskName: "Curso Portugues 30 minutos",exp:"30",selectedIcon:"5",date: Date.now()}, 

    {taskName: "Ejercicio",exp:"60",selectedIcon:"3",date: Date.now()},
    {taskName: "Ejercicios Visuales",exp:"15",selectedIcon:"3",date: Date.now()},


    
    {taskName: "Antes de Cel - Beber Agua",exp:"5",selectedIcon:"3",date: Date.now()},
    {taskName: "Antes de Cel - Duolinguo Portugues",exp:"10",selectedIcon:"12",date: Date.now()},
    {taskName: "Antes de Cel - Juego Mind",exp:"5",selectedIcon:"12",date: Date.now()},
    {taskName: "Antes de Cel - Leer Mantras",exp:"5",selectedIcon:"12",date: Date.now()},
    {taskName: "Antes de Cel - Lavar Dientes",exp:"5",selectedIcon:"3",date: Date.now()},
    {taskName: "Antes de Cel - Meditar",exp:"10",selectedIcon:"12",date: Date.now()},
    {taskName: "Antes de Cel - Regaderazo Agua Fria",exp:"10",selectedIcon:"12",date: Date.now()},
    {taskName: "Antes de Cel - Tender cama",exp:"5",selectedIcon:"12",date: Date.now()},

    
    {taskName: "No agregué Levantarme",exp:"-500",selectedIcon:"3",date: Date.now()},

    {taskName: "Preparar Ropa",exp:"15",selectedIcon:"12",date: Date.now()},
    {taskName: "Preparar Lista de pendientes de mañana",exp:"15",selectedIcon:"12",date: Date.now()},

    {taskName: "Tirar Basura",exp:"10",selectedIcon:"4",date: Date.now()},
    {taskName: "Tomar Pastilla",exp:"5",selectedIcon:"3",date: Date.now()},




];
let arrayJobTask       = [];
let todayExp                = 0;
export let monthExp                = 0;



let bebiAzucar = 0;
let comiAzucar = 0;
let comiPan = 0;
let divage = 0;
let masDeUnaHoraEnElCelular = 0;
let tuvePensamientoF = 0;
let tuvePensamientoX = 0;
let hiceX =0 ;
let hiceX_talk = 0;


let dsduolinguo = 0;
let dsejercicio = 0;
let dsjuegomind = 0;
let dsmeditardesp = 0;
let dsmeditardormir = 0;

let spanIWonNoMa = 0;
let spanIwonChat = 0;



//


// Fin Variables Globales 
// **************************************************************** Componentes ******************************************

const addTaskBtn = document.getElementById('addTaskButton');
let datePick = document.getElementById('datePicker');
const getTaskBtn = document.getElementById('getTasks');
let selectFrequent = document.getElementById('frequentTasks');
let selectNegativeTasks = document.getElementById('negativeTasks');

const btnNegativeTasks = document.getElementsByClassName('btnNegativeTasks');

const btnIWon = document.getElementsByClassName('btnIwon');


for (let i = 0; i < btnNegativeTasks.length; i++) {
    btnNegativeTasks[i].onclick = function(evt) { 
      addNegativeTask(evt);
    };
}


for (let i = 0; i < btnIWon.length; i++) {
    btnIWon[i].onclick = function(evt) { 
        addIwon(evt);
    };
}



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

    let name = document.getElementById("icon_prefix");
    name.value = evt.target.value;
    
    let selectExp = document.getElementById('icon_time-exp');
    switch (evt.target.value    ) {
        case 'Bañarme':
            selectExp.value = '15';
        break;

        case 'Barrer':
            selectExp.value = '10';
        break;

        case 'Cenar':
            selectExp.value = '20';
        break;

        case 'Comer':
            selectExp.value = '20';
        break;

    
        case 'Desayunar':
            selectExp.value = '20';
        break;


        case 'Fui Productivo Llegando De Tandra':
            selectExp.value = '50';
        break;
    

        case 'Ir A Aurrera':
            selectExp.value = '25';
        break;

        case 'Ir A Waldos':
            selectExp.value = '25';
        break;

        case 'Ir Al Mercado':
            selectExp.value = '25';
        break;


        case 'Lavar Baño':
            selectExp.value = '10';
        break;


        case 'Lavar Dientes':
            selectExp.value = '5';
        break;

        case 'Lavar Ropa':
            selectExp.value = '15';
        break;
        
        case 'Preparar Desayuno':
            selectExp.value = '15';
        break;

        case 'Preparar Cena':
            selectExp.value = '20';
        break;

        case 'Preparar Comida':
            selectExp.value = '25';
        break;



        case 'Trapear':
            selectExp.value = '5';
        break;

      
        case 'Pensamiento X':
            selectExp.value = '-10';
        break;

        case 'Pensamiento F':
            selectExp.value = '-10';
        break;


        case 'Pensamiento D':
            selectExp.value = '-10';
        break;

        case 'Divagar':
            selectExp.value = '-5';
        break;

        case 'No agregue':
            selectExp.value = '-50';
        break;


       


      
        



        default:
        break;
    }
    


});//Evento Select Frequent Task



selectNegativeTasks.addEventListener( 'change', (evt) => {

    let name = document.getElementById("icon_prefix");
    name.value = evt.target.value;
    
    let selectExp = document.getElementById('icon_time-exp');
    switch (evt.target.value    ) {
       
        
        case 'Bebi Azucar':
            selectExp.value = '-50';
        break;

        case 'Comi Azucar':
            selectExp.value = '-50';
        break;



        case 'Comi Pan':
            selectExp.value = '-50';
        break;



        case 'Mas De 1 Hora En El Celular':
            selectExp.value = '-50';
        break;

        case 'No Tire Basura':
            selectExp.value = '-50';
        break;


 
        case 'Pensamiento X':
            selectExp.value = '-10';
        break;

        case 'Pensamiento F':
            selectExp.value = '-10';
        break;


        case 'Pensamiento D':
            selectExp.value = '-10';
        break;

    

      

        default:
        break;
    }
    


});//Evento Select Frequent Task

datePick.addEventListener('change', (evt) =>{
    let selectedMonth = new Date(evt.target.value);
    getCompletedData(selectedMonth.getMonth().toString()+selectedMonth.getFullYear().toString());
});
// Fin Eventos 
// **************************************************************** Funciones Eventos ****************************************** 
            
            

    

// Fin Eventos Funciones eventos
// **************************************************************** Funciones DB ****************************************** 



            //Obtiene Current Day
            const queryGetDay = await getDocs(collection(dbGet, "date"));
          //  alert('Get Date')
                queryGetDay.forEach((doc) => {
                    lastDay = doc.data().today;
                    lastDayId = doc.id;
                    todayExp = doc.data().todayExp;
                    monthExp = doc.data().monthExp;
                    

                }
            );
           


            const queryGetDiasSeguidosID = await getDocs(collection(dbGet, "diasSeguidos"));
            //  alert('Get Date')
                  queryGetDiasSeguidosID.forEach((doc) => {
                   
                      diasSeguidosId = doc.id;
                    
                  }
              );

            const queryGetDiasSeguidos = await getDocs(collection(dbGet, "diasSeguidos"));
            //  alert('Get Date')
                  queryGetDiasSeguidos.forEach((doc) => {
                      dsduolinguo = doc.data().dsduolinguo;
                      dsejercicio = doc.data().dsejercicio;
                      dsjuegomind = doc.data().dsjuegomind;
                      dsmeditardesp = doc.data().dsmeditardesp;
                      dsmeditardormir = doc.data().dsmeditardormir;  
                      spanIWonNoMa =  doc.data().eviteMastur;
                      spanIwonChat = doc.data().eviteAbrirChat;
                      
                  }
              );


        

            
            export async function insertNewDay(newTodayExp, newMonthExp){
               //await deleteDoc(doc(dbGet, "date", lastDayId));
              
                let newInfo = {
                    today: Date.now(), todayExp: newTodayExp, monthExp: newMonthExp
                }
                db.collection("date").doc(lastDayId).update(newInfo)
                .then((docRef) => {
                    displayToast('Adding Daily Tasks');
                })
                .catch((error) => {
                    alert(error)
                });
            }



            export async function insertIwon(taskName, times){
                //await deleteDoc(doc(dbGet, "date", lastDayId));
              

                let newInfo = {};
                if(taskName=="Evite Mastur..."){
                    newInfo.eviteMastur = times
                }

                if(taskName=="Evite Abrir Chat"){
                    newInfo.eviteAbrirChat=times;
                }

            
               
                 db.collection("diasSeguidos").doc(diasSeguidosId).update(newInfo)
                 .then((docRef) => {
                     displayToast('Adding Daily Tasks');
                 })
                 .catch((error) => {
                     alert(error)
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
                            timeStart:      doc.data().timeStart,
                            avance:         doc.data().avance,
                        }
                        
                        
                    arrayTask.push(objTasks);
                    
                }
                
            );
            

            
            const querySnapshotJob = await getDocs(collection(dbGet, "jobTasks"));
            querySnapshotJob.forEach((doc) => {
                    let objTasks = {
                        id:             doc.id,
                        taskName:       doc.data().taskName,
                        exp:            doc.data().exp,
                        selectedIcon:   doc.data().selectedIcon,
                        timeStart:      doc.data().timeStart,
                        avance:         doc.data().avance,
                    }
                    
                    
                arrayJobTask.push(objTasks);
                
            }
            
        );


            

            /*
            const querySnapshotDomestic = await getDocs(collection(dbGet, "domesticTasks"));
                querySnapshotDomestic.forEach((doc) => {
                        let objTasks = {
                            id:             doc.id,
                            taskName:       doc.data().taskName,
                            exp:            doc.data().exp,
                            selectedIcon:   doc.data().selectedIcon,
                            timeStart:      doc.data().timeStart
                        }
                    arrayDomesticTask.push(objTasks);
                    
                }
                
            );
            */

            

            

           
// Fin Funciones DB
// **************************************************************** Funciones Date ****************************************** 
            

            function getHMString(x){
                return String(x).length==1 ? '0' + String(x) : x;
            }//Anade un 'Cero' al princpio a las horas y minutos de un digito: ejemplo convuerte 22:5 en 22:05

           

            function isAlreadyAdded(taskActivityLog){
                let task =  false;
                arrayTask.forEach(element => {
                    if(element.taskName==taskActivityLog){
                        task = true;
                    }
                });
                return task;
            }


            export function getToday(){

                //Obtiene la 'Today Exp'
                let todayExpDiv = document.getElementById('logo-container');
                todayExpDiv.innerText=todayExp;

                //Fin obtiene la 'Today Exp'
             
                let currentDay = new Date(Date.now());
                let dateDB = new Date(Number(lastDay));

                if(currentDay.getMonth() == dateDB.getMonth()){
                    
                }else{
                    monthExp=0;
                }
              
                if(currentDay.getDate() == dateDB.getDate()){
                  
                }else{
                
                    insertNewDay(0,monthExp);//aqui mando los datos como argumento
                    
                    let arrayCursosTasks = [
                        
                       
                    ];

                    //taskName,exp,selectedIcon2,date2



                    /* Este array me permitia llenar la tabla domesticTask y es atabla llenaba el array domesticktasks
                    arrayDailyTasks.forEach(element => {
                       
                        let a = isAlreadyAdded(element.taskName);
                        let thisDate = new Date(Date.now());

                        setTimeout(function() { 
                            if(!a){
                                if(element.taskName=="Lavar Baño"){
                           
                                    if(thisDate.getDay()==2  || thisDate.getDay()==6 ){
                                        insertDailyTasks(element.taskName, element.exp, element.icon, Date.now(),"domesticTasks");
                                    }
                                }else if(element.taskName=="Afeitarme"){
                                    
                                    if(thisDate.getDay()==0  || thisDate.getDay()==2 ){
                                        insertDailyTasks(element.taskName, element.exp, element.icon, Date.now(),"domesticTasks");
                                    }
                                }else if(element.taskName.includes("Lavar Trapeador")){
                                    if(thisDate.getDay()==6){
                                        insertDailyTasks(element.taskName, element.exp, element.icon, Date.now(),"domesticTasks");
                                    }
                                }else if(element.taskName.includes("Lavar Toalla Gris")){
                                    if(thisDate.getDay()==6){
                                        insertDailyTasks(element.taskName, element.exp, element.icon, Date.now(),"domesticTasks");
                                    }
                                }else if(element.taskName.includes("Lavar Toalla Blanca")){
                                    
                                    if(thisDate.getDay()==6){
                                        insertDailyTasks(element.taskName, element.exp, element.icon, Date.now(),"domesticTasks");
                                    }
                                }else if(element.taskName.includes("Lavar Ropa")){
                                    if(thisDate.getDay()==6){
                                        insertDailyTasks(element.taskName, element.exp, element.icon, Date.now(),"domesticTasks");
                                    }
                                }else if(element.taskName.includes("Tirar Basura")){
                                    if(thisDate.getDay()==6){
                                        insertDailyTasks(element.taskName, element.exp, element.icon, Date.now(),"domesticTasks");
                                    }
                                }else{
                                
                                  insertDailyTasks(element.taskName, element.exp, element.icon, Date.now(),"domesticTasks");
                                }
                            }
                        }, 50);

                    });
                    */

                    

                    arrayCursosTasks.forEach(element => {
                        setTimeout(function() { 
                            insertDailyTasks(element.taskName, element.exp, element.icon, Date.now(),"tasks");
                        }, 50);
                    });

                    
                }//ELSE






              
            }//GetToday


// Fin FUnciones Date

//Actvidades para registrar last Day
   
// **************************************************************** Funciones Manipular DOM ******************************************
            function displayExp(totalExp,monthTotalExp){
                let pTotalExp = document.getElementById('completedTask');
                pTotalExp.innerText = ` ${totalExp} Exp`

                let pTotalMonthExp = document.getElementById('completedMonthTask');
                pTotalMonthExp.innerText = `Completed This Month | ${monthTotalExp} XP`;
                
            }

            /*
            function taskActivityLog(){
                let i = 0;
                arrayLastDone.forEach(element => {
                  
                    let today = new Date(Date.now());
                   
                    
                    
                    //Aqui se soluciona el bug para las fechas que se repiten en la lista
                    let last = new Date(Number(arrayLastDone[i].last));
                    
                    //alert('Trying')
                   
                    let mesHoy = today.getMonth()
                    let mesFechaActividad = last.getMonth()

                    let diaHoy= today.getDate();
                    let diaFechaActividad=last.getDate();

                  
                    let mismoDia = false;
                    let ayer=false;
                  
                    if(mesHoy==mesFechaActividad && diaHoy==diaFechaActividad){
                        mismoDia=true;
                    }

                    let dif = diaHoy-diaFechaActividad;
                  
                    if(dif==1){
                        ayer=true;
                    }




                    
                    
                   // alert(typeof a1.toString())
                    //alert(typeof a2.toString())

                    let totalDiasSin = today - Number(arrayLastDone[i].last);   //es para sacar la resta de fechas entre last done y today
                    totalDiasSin /= 86400000;
                    
                    let li = document.createElement("li");
                    li.classList.add("titles", "daysWD");
                   
                    

                    //(Math.round(totalDiasSin) == 0 || Math.round(totalDiasSin) == 1) 
                    li.innerText=`${element.name} - ${last.getDate()} ${getMonthString(last.getMonth())} ${last.getFullYear()} ${getHMString(last.getHours())}:${getHMString(last.getMinutes())}     -------------     || ${ mismoDia ? "Hoy" : (Math.floor(totalDiasSin == 1) || ayer) ? "Ayer" : "Hace " + Math.ceil(totalDiasSin)+ " Dias"}`;
                    let listDaysWD = document.getElementById("listDaysWD");
                    listDaysWD.appendChild(li);
                    i++;
                });

               

        
            }
            */

            function taskActivityLog() {
                let i = 0;
                // Limpia la tabla antes de llenarla
                const table = document.getElementById("listDaysWD");
                let tbody =  document.createElement('tbody');

                arrayLastDone.forEach(element => {
                    let today = new Date(Date.now());
                    let last = new Date(Number(arrayLastDone[i].last));
        
                    let mesHoy = today.getMonth();
                    let mesFechaActividad = last.getMonth();
                    let diaHoy = today.getDate();
                    let diaFechaActividad = last.getDate();
        
                    let mismoDia = false;
                    let ayer = false;
        
                    if (mesHoy == mesFechaActividad && diaHoy == diaFechaActividad) {
                        mismoDia = true;
                    }
        
                    let dif = diaHoy - diaFechaActividad;
                    if (dif == 1) {
                        ayer = true;
                    }
        
                    let totalDiasSin = today - Number(arrayLastDone[i].last);
                    totalDiasSin /= 86400000;
        
               
                    let row = document.createElement("tr"); // Crea una nueva fila
        
                    // Crea las celdas
                    let cellName = document.createElement("td");
                    let cellStatus = document.createElement("td");
        
                    // Llena las celdas
                    cellName.innerText = `${element.name} - ${last.getDate()} ${getMonthString(last.getMonth())} ${last.getFullYear()} ${getHMString(last.getHours())}:${getHMString(last.getMinutes())}`;
                    cellStatus.innerText = mismoDia ? "Hoy" : (Math.floor(totalDiasSin == 1) || ayer) ? "Ayer" : "Hace " + Math.ceil(totalDiasSin) + " Días";
        
                    row.appendChild(cellName); // Agrega la celda del nombre a la fila
                    row.appendChild(cellStatus); // Agrega la celda del estado a la fila
        

                    tbody.appendChild(row); // Agrega la fila a la tabla
                    i++;
                   
                });
                table.appendChild(tbody);
            }


            function negativeTasksLog(){
                let contenedorBebiAzucar = document.getElementById('bebiAzucar');
                contenedorBebiAzucar.innerText=bebiAzucar;


                let contenedorComiAzucar = document.getElementById('comiAzucar');
                contenedorComiAzucar.innerText=comiAzucar;

                let contenedorComiPan = document.getElementById('comiPan');
                contenedorComiPan.innerText=comiPan;

                let contenedorDivage = document.getElementById('divage');
                contenedorDivage.innerText=divage;


                let contenedorMasDeUnaHora = document.getElementById('masDeUnaHoraEnElCelular');
                contenedorMasDeUnaHora.innerText=masDeUnaHoraEnElCelular;

                let contenedortuvePensamientoX = document.getElementById('pensamientoX');
                contenedortuvePensamientoX.innerText=tuvePensamientoX;

                let contenedortuvePensamientoF = document.getElementById('pensamientoF');
                contenedortuvePensamientoF.innerText=tuvePensamientoF;
           
                
                


                let contenedorHiceX = document.getElementById('hiceX');
                contenedorHiceX.innerText=hiceX;

                let contenedorHiceXTalk = document.getElementById('hiceXTalk');
                contenedorHiceXTalk.innerText=hiceX_talk;
            }

            function positiveTasksLog(){
            let contenedorDsduolinguo = document.getElementById('dsduolinguo');
            contenedorDsduolinguo.innerText = dsduolinguo;


            let contenedorDsejercicio = document.getElementById('dsejercicio');
            contenedorDsejercicio.innerText = dsejercicio;

            let contenedorDsjuegomind = document.getElementById('dsjuegomind');
            contenedorDsjuegomind.innerText = dsjuegomind;

            let contenedorDsmeditardesp = document.getElementById('dsmeditardesp');
            contenedorDsmeditardesp.innerText = dsmeditardesp;

            let contenedorDsmeditardormir = document.getElementById('dsmeditardormir');
            contenedorDsmeditardormir.innerText = dsmeditardormir;

            }

            function iWon(){
                let contenedorIwonNoMas = document.getElementById('spanIWonNoMa');
                contenedorIwonNoMas.innerText = spanIWonNoMa;

                let contenedorIwonNoAbri = document.getElementById('spanIWonNoWAF');
                contenedorIwonNoAbri.innerText = spanIwonChat;

                

            }
    
            function fillLastDone(id,taskName,exp,selectedIcon,dateStarted,date){
              
              

                if(taskName.includes("Afeitarme")){
                    if(dateStarted>arrayLastDone[0].last){
                        arrayLastDone[0].last=dateStarted;
                    }
                
                }
              
                if(taskName.includes("Bañarme")){
                    if(dateStarted>arrayLastDone[1].last){
                        arrayLastDone[1].last=dateStarted;
                    }
                
                }

                if(taskName=="Barrer"){
                    if(dateStarted>arrayLastDone[2].last){
                        arrayLastDone[2].last=dateStarted;
                    }
                
                }

                if(taskName.includes("Curso Linux")){
                    if(dateStarted>arrayLastDone[3].last){
                        arrayLastDone[3].last=dateStarted;
                    }
                
                }


            
                if(taskName=='Ejercicio'){
                    if(dateStarted>arrayLastDone[4].last){
                        arrayLastDone[4].last=dateStarted;
                    }
                
                }


                //Aqui se agregan last done
                //Hay un arreglo de objetos al inicio llenar tarea ahi tambien
                if(taskName=="Lavar Baño"){
                    if(dateStarted>arrayLastDone[5].last){
                        arrayLastDone[5].last=dateStarted;
                    }
                
                }

                if(taskName=="Lavar Dientes"){
                    if(dateStarted>arrayLastDone[6].last){
                        arrayLastDone[6].last=dateStarted;
                    }
                
                }


                if(taskName.includes("Lavar Toalla Blanca")){
                    if(dateStarted>arrayLastDone[7].last){
                        arrayLastDone[7].last=dateStarted;
                    }
                
                }


                if(taskName.includes("Lavar Toalla Gris")){
                    if(dateStarted>arrayLastDone[8].last){
                        arrayLastDone[8].last=dateStarted;
                    }
                
                }

                if(taskName.includes("Lavar Trapeador")){
                    if(dateStarted>arrayLastDone[9].last){
                        arrayLastDone[9].last=dateStarted;
                    }
                    
                }


                if(taskName.includes("Levantarme")){
                        if(dateStarted>arrayLastDone[10].last){
                            arrayLastDone[10].last=dateStarted;
                        }
                }


                if(taskName.includes("Meditar")){
                    if(dateStarted>arrayLastDone[11].last){
                        arrayLastDone[11].last=dateStarted;
                    }
                
                }


                if(taskName.includes("Tomar Pastilla")){
                    if(dateStarted>arrayLastDone[12].last){
                        arrayLastDone[12].last=dateStarted;
                    }
                
                }



                if(taskName=="Trapear"){
                    if(dateStarted>arrayLastDone[13].last){
                        arrayLastDone[13].last=dateStarted;
                    }
                
                }


                           
                if(taskName=="Bebi Azucar"){
                    if(dateStarted>arrayLastDone[14].last){
                        arrayLastDone[14].last=dateStarted;
                    }
                
                }

                if(taskName=="Comi Azucar"){
                    if(dateStarted>arrayLastDone[15].last){
                        arrayLastDone[15].last=dateStarted;
                    }
                
                }

                if(taskName=="Comi Pan"){
                    if(dateStarted>arrayLastDone[16].last){
                        arrayLastDone[16].last=dateStarted;
                    }
                
                }

                if(taskName=="Divagar"){
                    if(dateStarted>arrayLastDone[17].last){
                        arrayLastDone[17].last=dateStarted;
                    }
                
                }

                if(taskName=="No Tire Basura"){
                    if(dateStarted>arrayLastDone[18].last){
                        arrayLastDone[18].last=dateStarted;
                    }
                
                }
               
                            
                if(taskName.includes("+1 Hora en el celular")){
                   
                    let a = Number(exp);
                   
                    if(dateStarted>arrayLastDone[19].last){
                        arrayLastDone[19].last=dateStarted;
                    }
            
                
                }


                if(taskName.includes("Pensamiento F")){
                    if(dateStarted>arrayLastDone[20].last){
                        arrayLastDone[20].last=dateStarted;
                    }
                
                }

                if(taskName.includes("Pensamiento X")){
                    if(dateStarted>arrayLastDone[21].last){
                        arrayLastDone[21].last=dateStarted;
                    }
                
                }


              
                if(taskName=="X"){
                    if(dateStarted>arrayLastDone[22].last){
                        arrayLastDone[22].last=dateStarted;
                    }
                }

                if(taskName.includes("X-Talk")){
                    if(dateStarted>arrayLastDone[23].last){
                        arrayLastDone[23].last=dateStarted;
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

                                        let startDate = new Date(Number(date));
                                       
                                        pTitles.innerText=`${taskName} -- ${startDate.getDate()} at ${getHMString(startDate.getHours())}: ${getHMString(startDate.getMinutes())}h`;


                                    let divCard_content2                  = document.createElement('div');
                                    divCard_content2.classList.add('card-content', 'titles-completed');
                                        let pLight                                     = document.createElement('p');
                                        pLight.classList.add('p','tektur');
                                    
                                    
                                    
                                        
                                        pLight.innerText=`${exp} px`;
                                        

                                        taskName.includes("Pensamiento F") && 

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
                            
                            
                                
                                
                               
                                
                                if(taskName=='Ejercicio'){
                                  
                                    //pTitles.classList.add('blue-text');
                                    //pPx.classList.add('blue-text');
                                    pLight.classList.add('blue-text');
                                    iMaterial_Icons.classList.add('blue-text');
                                }


                                if(Number(selectedIcon)==12){
                                  
                                    //pTitles.classList.add('orange-text');
                                    //pPx.classList.add('orange-text');
                                    pLight.classList.add('orange-text');
                                    iMaterial_Icons.classList.add('orange-text');
                                }

                                if(Number(selectedIcon)==3){
                                  
                                    //pTitles.classList.add('green-text');
                                    //pPx.classList.add('green-text');
                                    pLight.classList.add('green-text');
                                    iMaterial_Icons.classList.add('green-text');
                                }




                                if(Number(exp)<0){
                                  
                                    //pTitles.classList.add('red-text');
                                   // pPx.classList.add('red-text');
                                    pLight.classList.add('red-text');
                                    iMaterial_Icons.classList.add('red-text');
                                }

                         
                   

            }// fillCompletedTasks

           

            function reiniciarCompletedTask(){  
            
                let taskToBeDone            = document.getElementById('dateContainer');
                while (taskToBeDone.firstChild) {
                    taskToBeDone.removeChild(taskToBeDone.firstChild);
                }
                
            }

            export function fillTasksTobeDone(id,taskName,exp,selectedIcon,date,avance){

                let pTodayExp = document.getElementById("logo-container");
                pTodayExp.innerText=todayExp;


                let taskToBeDone            = document.getElementById('tasksToBeDone');
                

                let divColS12M4             = document.createElement('div');
                divColS12M4.classList.add('col', 's12', 'm4');
                
              

                let divIcon_BlockCard_Task  = document.createElement('div');
                divIcon_BlockCard_Task.classList.add('icon-block', 'card-task');  
                
                let divIcon_Title  = document.createElement('div'); //Para el icono y el % de avance
                divIcon_Title.classList.add("div-title");


                /*
                let input_Title  = document.createElement('input'); //Para el icono y el % de avance
                input_Title.classList.add("input-title");
                */

 



                let h2CenterLight_blue_text = document.createElement('h2');
                h2CenterLight_blue_text.classList.add('center', 'light-blue-text');

                let iMaterial_icons         = document.createElement('i');
                iMaterial_icons.classList.add('material-icons');


                let iMaterial_iconsStart         = document.createElement('i');
                iMaterial_iconsStart.classList.add('material-icons');


                let icon=getSelectedIcon(selectedIcon);


                iMaterial_icons.innerText=icon;//AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
                iMaterial_iconsStart.innerText=getSelectedIcon("10");


                let pAvance                       = document.createElement('i');
                pAvance.classList.add('light', 'tektur');
                pAvance.innerText = `${avance}%`; 

                
                if(avance=="0"){
                    pAvance.classList.add("red-text");
                }

              

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
                    taskStarted(evt,"tasks");
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
                    taskCompleted(evt,"tasks",false);
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
                    taskCanceled(evt,"tasks");
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

                
                divIcon_Title.appendChild(iMaterial_iconsStart);
               // divIcon_Title.appendChild(input_Title);
                divIcon_Title.appendChild(pAvance);
                /*
                divIcon_BlockCard_Task.appendChild(iMaterial_iconsStart);
                divIcon_BlockCard_Task.appendChild(pAvance);
                */
                divIcon_BlockCard_Task.appendChild(divIcon_Title);
                divIcon_BlockCard_Task.appendChild(h2CenterLight_blue_text);
                divIcon_BlockCard_Task.appendChild(h5CenterTitles);
                divIcon_BlockCard_Task.appendChild(divCard_Task_Buttons);
                divIcon_BlockCard_Task.appendChild(p);

                if( selectedIcon==="11"){
                    iMaterial_iconsStart.classList.add("red-text");
                }

                divColS12M4.appendChild(divIcon_BlockCard_Task);

                taskToBeDone.appendChild(divColS12M4);
            }//fillTasksTobeDone


            /*
            function fillDomesticTasksTobeDone(id,taskName,exp,selectedIcon,date,dateStarted){

                
                let taskToBeDone            = document.getElementById('DomesticTasksToBeDone');
                

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
                    taskStarted(evt,"domesticTasks");
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
                    taskCompleted(evt,"domesticTasks");
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
                    taskCanceled(evt,"domesticTasks");
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

                if( selectedIcon==="11"){
                    iMaterial_iconsStart.classList.add("red-text");
                }

                divColS12M4.appendChild(divIcon_BlockCard_Task);

                taskToBeDone.appendChild(divColS12M4);
            }//fillTasksTobeDone

            */

            function fillDomesticTasksTobeDone(id, taskName, exp, selectedIcon, date, dateStarted) {
                let taskToBeDone = document.getElementById('DomesticTasksToBeDone');
            
                // Crear botón de Materialize
                let aTaskButton = document.createElement('a');
                aTaskButton.classList.add('waves-effect', 'waves-light', 'btn');
                aTaskButton.setAttribute('id', id);
                aTaskButton.setAttribute('taskName', taskName);
                aTaskButton.setAttribute('exp', exp);
                aTaskButton.setAttribute('selectedIcon', selectedIcon);
                aTaskButton.setAttribute('date', Date.now());
            
                // Añadir evento al botón
                aTaskButton.addEventListener('click', (evt) => {
                    taskCompleted(evt, "domesticTasks",true);
                });
            
                // Crear icono de Materialize
                let iIcon = document.createElement('i');
                iIcon.classList.add('material-icons', 'right');
                iIcon.innerText = getSelectedIcon(selectedIcon);
            
                // Asignar texto (nombre de la tarea)
                aTaskButton.innerText = taskName + ' ' + exp + 'XP';
            
                // Agregar icono al botón
                aTaskButton.appendChild(iIcon);
            
                // Agregar el botón al contenedor principal
                taskToBeDone.appendChild(aTaskButton);
            }
            




            function fillJobTasksTobeDone(id,taskName,exp,selectedIcon,date,dateStarted){

                
                let jtaskToBeDone            = document.getElementById('JobTasksToBeDone');
                

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
                    taskStarted(evt,"jobTasks");
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
                    taskCompleted(evt,"jobTasks",false);
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
                    taskCanceled(evt,"jobTasks");
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

                if( selectedIcon==="11"){
                    iMaterial_iconsStart.classList.add("red-text");
                }

                divColS12M4.appendChild(divIcon_BlockCard_Task);


               
                jtaskToBeDone.appendChild(divColS12M4);
            }//fillTasksTobeDone



            function displayToast(test){
                //var toastHTML = `<span class="card-panel teal lighten-2">${test}</span>`;
               
                M.toast({html: test, class: "rounded"})
            }
// Fin Funciones Manipular DOM


sortArrayGetData();


export function getData(){
    
    
    
    let totalPendingTask = document.getElementById('totalPendingTask');
    totalPendingTask.classList.add('blue-text');
    totalPendingTask.innerText = `${arrayTask.length}`


    let totalPendingDomesticTask = document.getElementById('totalPendingDomesticTask');
    totalPendingDomesticTask.classList.add('blue-text');
    totalPendingDomesticTask.innerText = `${arrayDomesticTask.length}`


    let totalPendingJobTask = document.getElementById('totalPendingJobTask');
    totalPendingJobTask.classList.add('blue-text');
    totalPendingJobTask.innerText = `${arrayJobTask.length}`



    
    arrayTask.forEach(element => {
     
        
        
        fillTasksTobeDone(element.id, element.taskName, element.exp, element.selectedIcon,element.timeStart,element.avance);
        
    });


    arrayDomesticTask.forEach(element => {
       
        
        
        fillDomesticTasksTobeDone(element.id, element.taskName, element.exp, element.selectedIcon,element.timeStart);
        
    });


    arrayJobTask.forEach(element => {
      
        
        
        fillJobTasksTobeDone(element.id, element.taskName, element.exp, element.selectedIcon,element.timeStart);
        
    });


}


//Codigo Ordenar Array



export function getCompletedData(month){
    //byMonth trae el mes que mostrara

    let totalExp=0; // Este esta aqui por el momento pero deberia estar en su propio metodo porque calcula la EXP total
    if(month===undefined){
        arrayCompletedTasks.forEach(element => {
        
            let lookingForNan = Number(element.exp);
            if(isNaN(lookingForNan)){
                console.error(element.dateFinished);
            } 

            
            totalExp+=Number(element.exp); //Aqui hace la suma independientemente del mes
            let taskMonth = new Date(Number(element.date));
            fillLastDone(element.id, element.taskName, element.exp, element.selectedIcon, element.date, element.dateFinished);
            if(currentMonth==taskMonth.getMonth().toString()+taskMonth.getFullYear().toString()){
                totalExpCurrentMonth+=Number(element.exp);
                fillCompletedTasks(element.id, element.taskName, element.exp, element.selectedIcon, element.date, element.dateFinished);
            
        
                if(element.taskName=='Bebi Azucar') bebiAzucar++;
                if(element.taskName=='Comi Azucar') comiAzucar++;
                if(element.taskName=='Comi Pan') comiPan++;
                if(element.taskName=='Divagar') divage++;
                if(element.taskName=='Mas De 1 Hora En El Celular') masDeUnaHoraEnElCelular++;
                if(element.taskName=='Pensamiento F') tuvePensamientoF++;
                if(element.taskName=='Pensamiento X') tuvePensamientoX++;
                if(element.taskName=='X')hiceX++;
                if(element.taskName.includes('X-Talk')) hiceX_talk++;
                
            
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
        }
        });

    }

    console.log(totalExp);
    console.log(totalExpCurrentMonth);



    /*AQuiiiiiiiiiiiiiiii puedo obtener el total exp*/
    let todayExpDiv = document.getElementById('logo-container');
    todayExpDiv.innerText=totalExp;

    
    displayExp(totalExp,totalExpCurrentMonth);
    totalExpCurrentMonth=0;
    taskActivityLog();
    negativeTasksLog();
    positiveTasksLog();
    fillListBtnNegativeTasks();
    fillListBtnIWon();
    iWon();
    

}//GetcompletedData


function fillListBtnIWon(){
   
}

function fillListBtnNegativeTasks(){
    let ba = document.getElementById('bebiAzucar').innerText;
    document.getElementById('spanBA').innerText=ba*-100;

    let ca = document.getElementById('comiAzucar').innerText;
    document.getElementById('spanCA').innerText=ca*-100;

    let cp = document.getElementById('comiPan').innerText;
    document.getElementById('spanCP').innerText = cp * -100;

    let div = document.getElementById('divage').innerText;
    document.getElementById('spanDiv').innerText = div * -10;

    let mDC = document.getElementById('masDeUnaHoraEnElCelular').innerText;
    document.getElementById('spanMcel').innerText = mDC * -10;

    let pensamientoF = document.getElementById('pensamientoF').innerText;
    document.getElementById('spanTPF').innerText = pensamientoF * -10;

    let pensamientoX = document.getElementById('pensamientoX').innerText;
    document.getElementById('spanTPX').innerText = pensamientoX * -10;

    let hiceX = document.getElementById('hiceX').innerText;
    document.getElementById('spanHX').innerText = hiceX * -100;

    let hiceX_talk = document.getElementById('hiceXTalk').innerText;
    document.getElementById('spanHXT').innerText = hiceX_talk * -10;



}