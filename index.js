import {createStore ,applyMiddleware,combineReducers} from 'redux';
import logger from 'redux-logger';``
import axios from 'axios';
import thunk from 'redux-thunk';

const inc = 'increment';
const dec = 'decrement'
// const init = 'init'
const actionbyAmount = 'incrementBypayload'
const getUserAcountFullfiled = 'Fullfiled'
const getUserAcountPending = 'Pending'
const getUserAcountRejected = 'Rejected'
const store = createStore(combineReducers({
    amount:amoutReducer,
    bonus:bonusReducer,
}),applyMiddleware(logger.default,thunk.default)); //thunk is used to hold the funtion to get the data with async awati funciotn 
// const previous = []

function amoutReducer(state={amount:1},action){

switch (action.type) {
    case inc: return {amount:state.amount+ 1}
        break;
    case dec: return {amount:state.amount-1}
        break;
    case actionbyAmount: return {amount:state.amount+action.payload}
        break;
    case getUserAcountFullfiled: return {amount: action.payload,pending:false}
        break;
    case getUserAcountRejected: return {...state,error:action.error,pending:false}
        break;
    case getUserAcountPending: return {pending:true}
        break;
    default: return state
        break;
}  
}
function bonusReducer(state={points:1},action){

switch (action.type) {
    case inc: return {points:state.points+1}
        break;
    case actionbyAmount: if(action.payload >=100) {return {points:state.points+1}}
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
function incrementByPayload(value){
    return {type:actionbyAmount,payload:value}
}
function getUserAcotFullfiled(value){
    return {type:getUserAcountFullfiled,payload:value}///
}
function getUserAcotRejected(error){
    return {type:getUserAcountRejected,error:error}////  to handle thre function 
}
function getUserAcotPending(){
    return {type:getUserAcountPending}////
}

// async api calling 
function getUserAcount(id){
    return async(dispatch,getState)=>{
    try {
        dispatch(getUserAcotPending())
        const {data} = await axios.get(`http://localhost:3000/account/${id}`)
    dispatch (getUserAcotFullfiled(data.amount))//here we use dispatch again because of redux-thunk to handle response from api 
       }
       catch (error) {
           dispatch (getUserAcotRejected(error.message))
        } 
    }  
}
setTimeout(() => {
    // store.dispatch(getUserAcount(1)) //dispatch the function for action type 
    store.dispatch( getUserAcount(1)) 
}, 1000);



