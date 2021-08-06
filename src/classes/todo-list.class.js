/** 108. todo-list
 * Esta clase se encargara de agrupar toda la lista de tareas por hacer
 * Se crea un constructor el cual guarda un arreglo de todos vacio
 * 
 * Se definen los metodos que manejaran cada una de las acciones para nuestra lista de tareas
 *      nuevoTodo: cada vez que se ejecute esta funcion se agregara a la lista de todos, la informacion que se obtendra en el todo
 *      eliminar:
 *      marcarCompletado:
 *      eliminarCompletados:
 */

import { Todo } from "./todo.class";

export class TodoList {

    constructor(){
        //this.todos = []; ya no es necesario inicalizarlo aqui debido a que en el metodo cargarLocalStorage lo inicia en caso falso
        this.cargarLocalStorage();  //115.
    }

    //metodos
    
    nuevoToDo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage(); //115.
    }

    //112. eliminar todo utilizando filter
    eliminarToDo(id){
        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocalStorage();
    }

    /** 111. marcarCompletado
     * 
     * @param {*} id es el id de la tarea que seleccionamos esta se obtendra en una funcion dentro del archivo componentes
     * 
     * En este metodo vamos a obtener todas las tareas que estan dentro del arreglo todos
     * mediante un ciclo for los vamos a barrer para poder identificar cual de estas tareas corresponde al id que esta recibiendo,
     * a la tarea seleccionada se le aplicara lo inverso al estado completado
     */
    marcarCompletado(id){
        for (const todo of this.todos){
            if(todo.id == id){                      //esta condicion se hace con dos iguales debido a que el id que contiene el arreglo es 
                todo.completado = !todo.completado; //numero y el id de nuestro elemento html es un string
                this.guardarLocalStorage();
                break;
            }
        }
    }

    //113. eliminar todos completados
    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado );     //en esta ocasion toma todos los elementos que no han sido completados, los que ya se completaron los excluye
        this.guardarLocalStorage();
    }

    //115. guardando todos en localStorage
    guardarLocalStorage(){
        localStorage.setItem('todo',JSON.stringify(this.todos)); //guardar item en localStorage, debido a que es un arreglo de objetos lo vamos a convertir a string para que se pueda guardar (Explicacion OBJect Object)
        this.cargarLocalStorage();
    }

    //115. recuperando todos desde localStorage
    cargarLocalStorage(){

        //primero se obtiene la data del localStorage y se convierte a arreglo de objetos
        if(localStorage.getItem('todo')){
            this.todos = JSON.parse(localStorage.getItem('todo'));  //obtenemos de localStorage el string y lo convertimos a JSON para poder usarlo como arreglo de objetos
            
        }else{
            this.todos = [];
        }

        /**116. 
         * despues se toma el arreglo de objetos y mediante map(permite barrer cada elemento dentro del arreglo de todos y
         * retornar un arreglo con los elementos, estos elementos acorde la accion que se asigne en el parentesis tendra
         * una mutacion, en este caso queremos que se conviertan a instancias de la clase Todo)
         * se va a realizar la conversion
         */
        this.todos = this.todos.map((obj => Todo.fromJSON(obj)));
        //console.log('Todos',this.todos);

        this.obtenerCompletados();
        // this.todos = ( localStorage.getItem('todo'))
        //             ? JSON.parse(localStorage.getItem('todo'))
        //             : [];
    }
    
    obtenerCompletados(){       //metodo para obtener elementos que aun estan pendientes por completar
        let conteo = 0;
        const soloCompletados =[];
        for (const todo of this.todos){
            if(todo.completado == false ){
                soloCompletados.push(todo);
            }
        }
        conteo = soloCompletados.length;
        //console.log(conteo);
    }

    
}