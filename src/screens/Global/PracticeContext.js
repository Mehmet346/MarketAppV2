import React, {useState, useContext, useEffect} from 'react';

import axios from 'axios';


const PracticeContext = React.createContext();

const PracticeProvider = ({children}) => {
    const [kekstra, setKekstra] = React.useState(0);
    const [kekstraStock, setkekstraStock] = React.useState(25);
    const kekstraPrice = 3.25;

    const [cubukKraker, setCubukKraker] = React.useState(0);
    const [cubukKrakerStock, setcubukKrakerStock] = React.useState(25);
    const cubukKrakerPrice = 5;

    const [sut, setSut] = React.useState(0);
    const [sutStock, setsutStock] = React.useState(25);
    const sutPrice = 12;

    const [amount, setAmount] = React.useState(150);
    const [AdminAmount, setAdminAmount] = React.useState(0);

    const [product, setProduct] = useState([]);

    useEffect(() => {
           axios.get('https://63a0a0ed24d74f9fe83dcc71.mockapi.io/product/product').then((res) => {
                  setProduct(res);
                  console.log(res.data);
              })
    }, []);

    

    return(
       <PracticeContext.Provider value={{
              kekstra, kekstraPrice, kekstraStock, setKekstra,setkekstraStock, cubukKraker, cubukKrakerStock, cubukKrakerPrice, setCubukKraker, setcubukKrakerStock, sut,sutStock, sutPrice, setSut, setsutStock, amount, setAmount, AdminAmount, setAdminAmount,product,setProduct
       }}>
              {children}
       </PracticeContext.Provider>
    );
};

export {PracticeContext,PracticeProvider}