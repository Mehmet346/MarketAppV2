import React, { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
    basket: [],
    debt_state: [],
}

function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM': {

            let tempData = state.basket;
            let existItem = tempData.find((item) => item.id == action.payload.id) //We are checking if there is an item with the same data

            if (!existItem) {                               //if not
                tempData.push({ ...action.payload, sepetadet: 1 }) // create item and basketquantity 1
            } else {
                existItem.sepetadet += 1;         // else increase the number if any
            }
            return {
                ...state,                       //save State
                basket: tempData
            }
        }

        case 'CART_DELETE_ITEM': {
            let tempData = state.basket;
            let existItem = tempData.find((item) => item.id == action.payload.id)  //We are checking if there is an item with the same data
            let indexItem = tempData.findIndex((item) => item.id == action.payload.id);//We are checking item index

            if (existItem) {
                if (existItem.sepetadet > 0) {         // if itemQuantity > 0,  
                    existItem.sepetadet -= 1;          //else increase the number if any

                } else {
                    tempData.slice(indexItem, 1)       // if itemQuantity = 0
                }                                      // delete
            }

            return {                        //save State
                ...state,
                basket: tempData
            }
        }

        case 'DEBT_PAYMENT': {
            let tempData = state.debt_state;
            let existItem = tempData.find((item) => item.id == action.payload.id)
            if (!existItem) {                               //if not
                tempData.push({ ...action.payload, payment_state: true }) // create item and basketquantity 1
            } 
            return {
                ...state,                       //save State
                debt_state: tempData
            }
        }

        default:
            return state
    }
}

export function StoreProvider({ children }) {
    const firstAmount = 150
    const [showStatment, setShowStatment] = React.useState(false);
    const [amount, setAmount] = React.useState(firstAmount);
    const [AdminAmount, setAdminAmount] = React.useState(0);
    const [state, dispatch] = useReducer(reducer, initialState)
    const [user, setUser] = React.useState(0);
    const value = { state, dispatch, firstAmount, amount, setAmount, AdminAmount, setAdminAmount, showStatment, setShowStatment,user,setUser }
    return <Store.Provider value={value}>{children}</Store.Provider>
}