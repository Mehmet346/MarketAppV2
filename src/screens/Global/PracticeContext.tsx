import React, {useState, useContext, useReducer, useEffect} from 'react';
import reducerFunction from '../Global/reducer';

import axios from 'axios';
const PracticeContext = React.createContext();


const PracticeProvider = ({children}) => {
    const [amount, setAmount] = React.useState(150);
    const [AdminAmount, setAdminAmount] = React.useState(0);
    const [product, setProduct] = useState([]);

    const [state, dispatch] = useReducer(reducerFunction, initialState);
    const initialState = {
       count: 0
     }
   
    useEffect(() => {
           axios.get('https://63a0a0ed24d74f9fe83dcc71.mockapi.io/product/product').then((res) => {
                  setProduct(res);
              })
    }, []);

    
    return(
       <PracticeContext.Provider value={{
              amount, setAmount, AdminAmount, setAdminAmount,
              initialState,
              product,setProduct,
              state, dispatch
       }}>
              {children}
       </PracticeContext.Provider>
    );
};

export {PracticeContext,PracticeProvider}