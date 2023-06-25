import {legacy_createStore} from 'redux';

const todoForm = document.getElementById("todoForm");
const todoList = todoForm.querySelector("#todoList");
const todoInput = todoForm.querySelector("#todoInput");


const ADD_TODO = "add";
const DELETE_TODO = "delete";

const reducer = (state = [], action) => {
    console.log("reducer is started")
    switch(action.type) {
        case ADD_TODO :
            console.log(`reducer: ADD_TODO action.text: ${action.text}`);
            const todoObj = { text: action.text, id: Date.now()}
            return [todoObj, ...state];
        case DELETE_TODO :
            console.log(`reducer: DELETE_TODO action.id: ${action.id}`);
            const newState = state.filter(todo => String(todo.id) !== String(action.id));
            return newState;
        default:
            return state
    }
}



const store = legacy_createStore(reducer);


const AddTodo = text => {
    return {
        type: ADD_TODO,
        text,
    }
};

const dispatchAddTodo = text => {
    store.dispatch(AddTodo(text));
};

const DeleteTodo = id => {
    console.log(`DeleteTODO get id: ${id}`);
    return {
        type: DELETE_TODO,
        id,
    }
};

const dispatchDeleteTodo = event => {
    console.log("dispatchDeleteTodo is started");
    const id = event.target.parentNode.id;
    store.dispatch(DeleteTodo(id));
    console.log("dispatchDeleteTodo is finished");
}

const paintTodo = ()=> {
    console.log("paintTodo is started");
    todoList.innerHTML = "";
    const todoObjArray = store.getState();
    console.log(`paintTodo: state: ${JSON.stringify(todoObjArray)}`);
    
    todoObjArray.forEach( todo => {
        const li = document.createElement("li");
        li.innerText = todo.text;
        li.id = String(todo.id);

        console.log(`todo.text info- text:${todo.text} type: ${typeof(todo.text)}`);
        console.log(`todo.id info- id:${todo.id} type:${typeof(todo.id)}`);

        const btn = document.createElement("button");
        btn.innerText= "🗑";
        btn.addEventListener("click", dispatchDeleteTodo);

        li.appendChild(btn);
        todoList.appendChild(li);
    });

    console.log("paintTodo is finished");
    
};

store.subscribe(paintTodo);

const handleSubmit = event => {
    event.preventDefault();

    const todo = todoInput.value;
    todoInput.value = "";
    dispatchAddTodo(todo);
};

todoForm.addEventListener("submit", handleSubmit);