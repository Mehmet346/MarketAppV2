import React, { useContext, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { Store } from '../utils/Store';



export default function Admin({ navigation }) {

    const { state, dispatch, AdminAmount, setAdminAmount } = useContext(Store)
    const { basket, debt_state } = state;
    const user = firebase.auth().currentUser;
    const email = user?.email;

    Admin.navigationOptions = ({ }) => ({
        title: 'Admin',
        headerStyle: {
            backgroundColor: '#d50000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    });
    useEffect(() => {
        navigation.setParams({});
    }, []);

    const Debt = [          // My mock api: created and contextApi only once debt
    {
      personelName: 'PERSONEL 1',
      id: 1,
      debt: 35
    },
    {
       personelName: 'PERSONEL 2',
       id: 2,
       debt: 150
    },
    {
      personelName: 'PERSONEL 3',
      id: 3,
      debt: 25,
    }
  ];

  const debtPayment = (data) => {
    if(AdminAmount > data.debt){
        dispatch({
            type: 'DEBT_PAYMENT',
            payload: data
          })
          setAdminAmount(AdminAmount - data.debt)
    }
    else{
        alert("Borcu ödemek için bakiyeniz yetersiz")
    }
  }

    const Item = ({ ProductName, ProductStock, id }) => ( //row:34 First stock - Basket Stock = End Stock 
        <View style={style.page}>
            <View style={style.main}>
                <View>
                    <Text style={style.product}>{ProductName}</Text>
                </View>
                <View>
                    <Text style={style.product}>{ProductStock - (basket.find((item) => item.id == id)?.sepetadet)}</Text> 
                </View>
            </View>
        </View>
    )
    const renderItem = ({ item }) => (   //FlatList Stock
        <Item key={item.id} ProductName={item.name} ProductStock={item.qty} ProductPrice={item.price} id={item.id} />
    );

    const DebtItem = ({PersonelName, Debt, id}) =>(  //FlatList Debt
        <View style={style.main}>
        <View style={style.product}>
            <Text style={style.product}>{PersonelName}</Text>
        </View>
        <View>
            <Text style={style.product}>{Debt}</Text>
        </View>
        <View style={style.borc}>
            <Text style={style.state}>{((debt_state.find((item) => item.id == id)?.payment_state)) ? <Text>ÖDENDİ</Text> 
            : 
            <TouchableOpacity
            onPress={() => {
                debtPayment({
                    name: PersonelName,
                    debt: Debt,
                    id: id,
                })
            }}
            ><Text>BORCU ÖDE</Text></TouchableOpacity>}</Text>
        </View>
    </View>
    )

    const renderDebt = ({ item }) => (    //FlatList Debt
    <DebtItem key={item.id} PersonelName={item.personelName} Debt={item.debt} state={item.state} id={item.id} />);

    function logout(){
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
       }
       
    return (
        <SafeAreaView>
            {(email != 'admin@gmail.com') ?
             <View>
                <Text style={style.user}>Admin değilsiniz!</Text>
             <TouchableOpacity onPress={() => logout()}>
                <Text>Çıkış Yap</Text>
            </TouchableOpacity></View>  
            : 
            <TouchableOpacity onPress={() => logout()}>
                <Text>Çıkış Yap</Text>
            </TouchableOpacity>

            }
                {(email == 'admin@gmail.com') &&
        <View style={style.page}>
        <View style={style.button_footer}>
            <Text style={style.text}>KALAN STOKLAR</Text>
        </View>
        <FlatList
            data={basket}
            renderItem={renderItem}
            keyExtractor={product => product.id}
        />
        <View style={style.button_borc}>
            <Text style={style.text}>BORÇLAR</Text>
        </View>
        <FlatList
            data={Debt}
            renderItem={renderDebt}
            keyExtractor={product => product.id}
        />
        <View style={style.button_footer}>
            <Text style={style.text}>TOPLANAN PARA</Text>
        </View>

        <View style={style.main}>
            <View>
                <Text>MEVCUT BAKİYE</Text>
            </View>
            <View>
                <Text>{AdminAmount} TL</Text>
            </View>
        </View>
        </View>}
        </SafeAreaView>  
    );
}
const style = StyleSheet.create({
    text: { fontWeight: '400', fontSize: 30, marginLeft: 10 },
    button_footer: { marginVertical: 30, padding: 5, backgroundColor: '#bdbdbd' },
    main: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, },
    page: { marginHorizontal: 30 },
    borc: {},
    state: { backgroundColor: '#bdbdbd', paddingHorizontal: 10, paddingVertical: 3, marginBottom: 15 },
    product: { paddingHorizontal: 10, paddingVertical: 3, marginBottom: 5, fontWeight: 'bold' },
    button_borc: { marginVertical: 5, padding: 5, marginTop: 20, backgroundColor: '#bdbdbd' },
    user: { justifyContent: 'center', alignContent: 'center' }
})

