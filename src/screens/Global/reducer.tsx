import React, {useState, useReducer} from "react";


export default reducerFunction = (state, action) => {
     switch(action.type) { 
         case 'increment':
              return {
              ...state,
              count: state.count + 1,
              }
          
        case 'decrement':
              return {
              ...state,
              count: state.count - 1,
              }
       default:
              return state
     }             
};




