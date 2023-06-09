import {createStore ,applyMiddleware} from 'redux';
import logger from 'redux-logger';``
import axios from 'axios';
const inc = 'increment';
const dec = 'decrement'
const init = 'init'
const actionbyAmount = 'incrementBypayload'
const store = createStore(reducer,applyMiddleware(logger.default));
const previous = []

function reducer(state={amount:1},action){

switch (action.type) {
    case inc: return {amount:state.amount+ 1}
        break;
    case dec: return {amount:state.amount-1}
        break;
    case actionbyAmount: return {amount:state.amount+action.payload}
        break;
    case init: return {amount: action.payload}
        break;
    default: return state
        break;
}  
}

// store.subscribe(()=>{
//     previous.push(store.getState())
//      console.log(previous)
// })

// action reducer
function increment(){
    return {type:inc}
}
function decrement(){
    return {type:dec}
}
function incrementByPayload(pl){
    return {type:actionbyAmount,payload:pl}
}

// async api calling 
async function getUser(){
const {data} = await axios.get('http://localhost:3000/account/2').catch((err)=>console.log(err.message));
console.log(data)
}
getUser()

function initUser(pl){
    return {type:init,payload:pl}
}

setInterval(() => {
    store.dispatch(initUser(100)) //dispatch the function for action type 
}, 5000);



