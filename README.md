redux

# Goal of the redux

it gives a kind of `global state storage`.

how to setup and work?

0. create Store

1. function dispatch `action`

2. store pass `state` and `action` to `reducer`

3. reducer run codes which are proper for `action.type`

4. if there is `store.subscribe(handleChangeState);`, then `handleChangeState` will run
   - `subscribe` is a kind of eventListerner which is listening `change of state`,
   - if there is change, then run callback

# exercise with TodoList

## declare varables for action types

This will help to block typo error

```
const ADD_TODO = "add";
const DELETE_TODO = "delete";
```

## seperate AddTodo and dispatchAddTodo

seperating functions from one
to two parts.

one returns `Action` and another dispatchs `Action`

this is good for managing and modulization each functions

### example

AddTodo return only Action object

```
const AddTodo = text => {
    return {
        type: ADD_TODO,
        text,
    }
};
```

dispatchAddtodo recieve value and run `dispatch` with AddTodo

```
const dispatchAddTodo = text => {
    store.dispatch(AddTodo(text));
};

```

## reducer's two key rolles

### 1. don't mutate origin state

`spread operator` is useful tool for pure function

    - remember, don't push in origin array (state)

```
  case ADD_TODO :
            const todoObj = { text: action.text, id: Date.now()}
            return [todoObj, ...state];
```

### 2. return `state`

in below reducer code, every seperation returns state

```
const reducer = (state = [], action) => {
    switch(action.type) {
        case ADD_TODO :
            const todoObj = { text: action.text, id: Date.now()}
            return [todoObj, ...state];
        case DELETE_TODO :
            return state.filter(todo => todo.id !== action.id);
        default:
            return state
    }
}
```

## listening for changing statement

set `store.subscribe(function)`

for functions which are should run based on state's state
-like `paintTodo` or `saveTodoInSessionStorage`

### Error: delete Button Doesn't work

in below codes, there was type difference between `todo.id` and `action.id`

```
 case DELETE_TODO :
            console.log(`reducer: DELETE_TODO action.id: ${action.id}`);
            const newState = state.filter(todo => todo.id !== action.id);
            return newState;
```

how to handle?

1. wrapped `todo.id` and `action.id` with `String()`

```
String(todo.id) !== String(action.id)
```

2. just save todo.id as String in `paintTodo`

```
     const li = document.createElement("li");
        li.innerText = todo.text;
        li.id = String(todo.id);

```

## Debugging console.log

make `console.log` to see

0. start of the function
1. each args
2. for each diverging point
3. show end of the function

```
const paintTodo = ()=> {
    console.log("paintTodo is started");  // alert start of function
    todoList.innerHTML = "";
    const todoObjArray = store.getState();
    console.log(`paintTodo: state: ${JSON.stringify(todoObjArray)}`); / show state

    todoObjArray.forEach( todo => {
        const li = document.createElement("li");
        li.innerText = todo.text;
        li.id = String(todo.id);

        console.log(`todo.text info- text:${todo.text} type: ${typeof(todo.text)}`); //show var text
        console.log(`todo.id info- id:${todo.id} type:${typeof(todo.id)}`); // show var id

        const btn = document.createElement("button");
        btn.innerText= "🗑";
        btn.addEventListener("click", dispatchDeleteTodo);

        li.appendChild(btn);
        todoList.appendChild(li);
    });

    console.log("paintTodo is finished"); // alert function is finished

};

```
