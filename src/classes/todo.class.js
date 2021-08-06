/** 107. todo_class
 * Se construye una clase que manejara los todos de manera individual, de esta forma cada vez que creamos una 
 * tarea se ejecuta nuestro constructor el cual guardara:
 *  la descripcion de la tarea,
 *  se le asignara un id acorde el tiempo especifio en que se ejecuto la funcion,
 *  se marcara en false el estado de completado
 *  se asigna una fecha de creacion tomando la fecha actual en que se ejecuta la funcion
 */


export class Todo {

    //116.  definimos una funcion estatica que nos permitira convertir por cada objeto (del arreglo que nos devuelve de localStorage) una instancia de la clase Todo
    static fromJSON({id,tarea,completado,creado}){
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;
        return tempTodo;
    }

    //
    constructor(tarea) {
        this.tarea = tarea;
        this.id = new Date().getTime(); //tiempo actual funcionara como id unico
        this.completado = false;
        this.creado = new Date();
    }

    //116.  metodos
    imprimirClase(){
        console.log(`${this.tarea} - ${this.id}`);
    }
}