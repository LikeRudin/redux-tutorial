import {legacy_createStore} from 'redux';

const plusBtn = document.querySelector('#plus');
const minusBtn = document.querySelector('#minus');
const numSpan = document.querySelector('#num');

const PLUS ="plus";
const MINUS ="minus";

const reducer = (num = 0, action )=>{
    console.log("reducer is running");
    switch(action.type){
        case PLUS:
            return ++num;
        case MINUS:
            return --num;
        default: 
            return num;
    }
};


const numStore = legacy_createStore(reducer);

const handleChangeNum = () =>{
    console.log("num changed");
    numSpan.innerHTML = numStore.getState();
};

numStore.subscribe(handleChangeNum);


const handlePlusBtnClick = () =>{
    console.log("dispatch plus");
    numStore.dispatch({type: PLUS});
};

const handleMinusBtnClick = () =>{
    console.log("dispatch minus");
    numStore.dispatch({type: MINUS});
};

plusBtn.addEventListener('click', handlePlusBtnClick);
minusBtn.addEventListener('click', handleMinusBtnClick);