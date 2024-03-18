document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});



function addTask(){
    id              =   Date.now();
    taskName        =   document.getElementById('icon_prefix').value;
    exp             =   document.getElementById('icon_time-exp').value;
    selectedIcon    =   document.getElementById('selectedIcon').value;
    alert(selectedIcon);
    fillTasksTobeDone(id,taskName,exp,selectedIcon);

}//AddTask


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




/*

<option value=""  selected>It is for</option>
                <option value="1">Cooking</option>
                <option value="2">Exersice</option>
                <option value="3">Having Fun</option>
                <option value="4">Personal Projects</option>
                <option value="5">Shopping</option>
                <option value="6">Job</option>
* */


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




alert(`Icon ${icon}`);
iMaterial_icons.innerText=icon;//AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII



let h5CenterTitles          = document.createElement('h5');
h5CenterTitles.classList.add('center', 'tiltes');
h5CenterTitles.innerText=taskName;




let divCard_Task_Buttons    = document.createElement('div');
divCard_Task_Buttons.classList.add('card-task-buttons');

let aDone                   = document.createElement('a');
aDone.classList.add('waves-effect','waves-light','btn-small');
aDone.innerText='Done';

let iDone = document.createElement('i');
iDone.classList.add('material-icons', 'right');
iDone.innerText='check_box';


let aCancel                 = document.createElement('a');
aCancel.classList.add('waves-effect','waves-light','btn-small', 'red');
aCancel.innerText='Cancel';

let iCancel = document.createElement('i');
iCancel.classList.add('material-icons', 'right');
iCancel.innerText = 'cancel';

let p                       = document.createElement('p');
p.classList.add('light', 'tektur');
p.innerText = '10 PX'; //AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII



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





console.log(Date.now());