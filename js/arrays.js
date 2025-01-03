export  let arrayDailyTasks = [

    {taskName: "Afeitarme",exp:"10",icon:"3",date: Date.now()},
    {taskName: "Bañarme",exp:"5",icon:"3",date: Date.now()},
    {taskName: "Clase Flauta",exp:"30",icon:"12",date: Date.now()},

    {taskName: "Cumpli más de 2 días sin ejercicio",exp:"-50",icon:"3",date: Date.now()},
    {taskName: "Cumpli más de 2 días sin meditar",exp:"-50",icon:"12",date: Date.now()},

    {taskName: "Curso Linux 30 minutos",exp:"30",icon:"5",date: Date.now()},
    {taskName: "Curso Francés 30 minutos",exp:"30",icon:"5",date: Date.now()},
    {taskName: "Curso Portugues 30 minutos",exp:"30",icon:"5",date: Date.now()}, 

    {taskName: "Ejercicio",exp:"60",icon:"3",date: Date.now()},
    {taskName: "Ejercicios Visuales",exp:"15",icon:"3",date: Date.now()},


    {taskName: "Lavar Baño",exp:"15",icon:"3",date: Date.now()},
    {taskName: "Lavar Ropa",exp:"20",icon:"4",date: Date.now()},
    {taskName: "Lavar Toalla Blanca",exp:"15",icon:"4",date: Date.now()},
    {taskName: "Lavar Toalla Gris",exp:"15",icon:"4",date: Date.now()},
    {taskName: "Lavar Trapeador",exp:"15",icon:"4",date: Date.now()},

    {taskName: "Morning Routine",exp:"50",icon:"12",date: Date.now()},
    {taskName: "Empece MG en menos de 3 minutos?",exp:"5",icon:"12",date: Date.now()},
    
    {taskName: "Antes de agarrar Celular - Beber Agua",exp:"5",icon:"3",date: Date.now()},
    {taskName: "Antes de agarrar Celular - Cardio",exp:"15",icon:"3",date: Date.now()},
    {taskName: "Antes de agarrar Celular - Duolinguo Frances",exp:"10",icon:"12",date: Date.now()},
    {taskName: "Antes de agarrar Celular - Juego Mind",exp:"5",icon:"12",date: Date.now()},
    {taskName: "Antes de agarrar Celular - Leer Mantras",exp:"5",icon:"12",date: Date.now()},
    {taskName: "Antes de agarrar Celular - Lavar Dientes",exp:"5",icon:"3",date: Date.now()},
    {taskName: "Antes de agarrar Celular - Meditar",exp:"10",icon:"12",date: Date.now()},
    {taskName: "Antes de agarrar Celular - Regaderazo Agua Fria",exp:"10",icon:"12",date: Date.now()},
    {taskName: "Antes de agarrar Celular - Tender cama",exp:"5",icon:"12",date: Date.now()},

    
    {taskName: "No agregué Levantarme",exp:"-500",icon:"3",date: Date.now()},

    {taskName: "Preparar Ropa",exp:"15",icon:"12",date: Date.now()},
    {taskName: "Preparar Lista de pendientes de mañana",exp:"15",icon:"12",date: Date.now()},

    {taskName: "Tirar Basura",exp:"10",icon:"4",date: Date.now()},
    {taskName: "Tomar Pastilla",exp:"5",icon:"3",date: Date.now()},
   

    


];

export let arrayLastDone           = [

    {name: "Afeitarme", last:0},
    {name: "Bañarme", last:0},
    {name: "Barrer", last:0},
    {name: "Curso Linux", last:0},
    {name: "Ejercicio", last:0},
    
    {name: "Lavar Baño", last:0},
    {name: "Lavar Dientes", last:0},
    {name: "Lavar Toalla Blanca", last:0},
    {name: "Lavar Toalla Gris", last:0},
    {name: "Lavar Trapeador", last:0},

    {name: "Levantarme", last:0},
    {name: "Meditar", last:0},
    {name: "Tomar Pastilla", last:0},
    {name: "Trapear", last:0},

   





    {name: "Bebi Azucar", last:0},
    {name: "Comi Azucar", last:0},
    {name: "Comi Pan", last:0},
    {name: "Divagar", last:0},

    {name: "No Tire Basura", last:0},
    
    {name: "Mas De 1 Hora En El Celular", last:0},

    {name: "Pensamiento F", last:0},
    {name: "Pensamiento X", last:0},
    {name: "X", last:0},
    {name: "X-Talk", last:0},

]

export let arrayCompletedTasks     = [];
export let arrayTask               = [];
export let arrayDomesticTask       = [];
export let arrayJobTask       = [];



export function sortArrayCompletedData(){

    arrayCompletedTasks.sort(function (b, a) {
        return a.date - b.date;
    });

     // Aqui se escoge si byMoth o todas
    
     getCompletedData();
    
}//sortArrayCompletedData



