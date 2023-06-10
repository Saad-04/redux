import {createStore ,applyMiddleware} from 'redux';
import logger from 'redux-logger';``
import axios from 'axios';
import thunk from 'redux-thunk';

const inc = 'increment';
const dec = 'decrement'
const init = 'init'
const actionbyAmount = 'incrementBypayload'
const store = createStore(reducer,applyMiddleware(logger.default,thunk.default)); //thunk is used to hold the funtion to get the data with async awati funciotn 
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
async function getUser(dispatch,getState){
    const {data} = await axios.get('http://localhost:3000/account/2')
    dispatch ({type:init,payload:data.amount})
    
}

setTimeout(() => {
    store.dispatch(getUser) //dispatch the function for action type 
}, 1000);



