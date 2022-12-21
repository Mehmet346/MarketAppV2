import React,{ createContext, useReducer } from "react";


export const Store = createContext();


const initialState = {
   basket: []
}


function reducer (state,action) {
    switch (action.type) {
              case 'CART_ADD_ITEM':{
                       
                let tempData = state.basket;

                let existItem =  tempData.find((item) => item.id == action.payload.id)

              if(!existItem) {
               tempData.push({...action.payload, sepetadet:1})
              } else {
                  existItem.sepetadet +=1;
              }

                 return {
                            ...state,
                            basket: tempData
                 }
              }

              case 'CART_DELETE_ITEM': {
                 let tempData = state.basket;
                 let existItem =  tempData.find((item) => item.id == action.payload.id)
                 let indexItem  = tempData.findIndex((item) => item.id == action.payload.id);

                 
                 if(existItem) {
                     if(existItem.sepetadet > 0) {
                            existItem.sepetadet -=1;

                     } else {
                            tempData.slice(indexItem,1)
                     }
                 }
                 
                 return {
                            ...state,
                            basket: tempData
                 }
              }
              
              default:
                    return state
    }
}


export function StoreProvider({children}) {
    const [amount, setAmount] = React.useState(150);
    const [AdminAmount, setAdminAmount] = React.useState(0);
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = {state,dispatch,amount,setAmount,AdminAmount,setAdminAmount}
    return <Store.Provider value={value}>{children}</Store.Provider>
}