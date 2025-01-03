export function getDayString(day){
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


export function getSelectedIcon(selectedIcon){
         

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


    if(selectedIcon == '12'){
        return 'lightbulb_outline';
    }



}// getselectedIcon


export function getMonthString(month){

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