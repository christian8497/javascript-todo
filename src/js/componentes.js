import { Todo } from "../classes/index.classes";

import { todoList } from "../index";    //110.

//referencias html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');   //110.
const btnBorrar = document.querySelector('.clear-completed');   //113.
const ulFiltros = document.querySelector('.filters');    //117
const anchorFiltros = document.querySelectorAll('.filtro'); //117.
//const spanContador = document.querySelector('.contador');


//109. crear elemento de la lista que contiene una tarea
export const crearTodoHtml = (todo) => {    //creando elemento lista
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);  //se especifica solo agregar el primer hijo del div el cual es <li></li>
    return div.firstElementChild;
}

//  110. evento agregar tarea
txtInput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && txtInput.value.length > 0){

        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoToDo(nuevoTodo);  //110. rellenar el arreglo
        crearTodoHtml(nuevoTodo);   //110. crear nuevo elemento de lista
        txtInput.value = '';

    }
});

//  111. evento para detectar la tarea seleccionada y marcar|desmarcar como completada
divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName;  //detecta el elemento que estamos seleccionando
    const listaElemento = event.target.parentElement.parentElement; //obtenemos todo el elemento lista (esta incluye dentro un label, check, button)
    const todoId = listaElemento.getAttribute('data-id');   //tomar el id de la tarea seleccionada

    //si se ha dado click en el elemento check dentro de una tarea especifica de acuerdo a la tarea seleccionada, en el arreglo de tareas se marcara el estado completado : false|true
    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        listaElemento.classList.toggle('completed');

    }else if(nombreElemento.includes('button')){        //112. borrar la tarea
        todoList.eliminarToDo(todoId);
        divTodoList.removeChild(listaElemento);
    }
});


//113 eliminar completados html y en el arreglo
btnBorrar.addEventListener('click',()=> {
    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length-1; i>=0; i--) {
        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});



ulFiltros.addEventListener('click',(event)=> {  //117. aplicar filtros: accion que se realizara cada vez que se pulse un boton para aplicar filtros 
    // console.log(event.target.text);
    const filtro = event.target.text;

    if(!filtro){return;}        //si no existe nada entonces no realiza algo

    //aplicar la animacion de los botones de filtros para que se muestre seleccionado
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){
        //console.log(elemento);
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});