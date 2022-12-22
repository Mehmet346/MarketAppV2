import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, ScrollView, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";;
import { Store } from '../utils/Store';

export default function Basket({ navigation }) {

  const { state, dispatch, firstAmount, amount, setShowStatment, setAmount, setAdminAmount } = useContext(Store)
  const { basket } = state;

  Basket.navigationOptions = ({ }) => ({   // static navigationOptions amount state control
    title: 'Sepet',
    headerRight: () => <Text style={style.bar}>{amount} TL</Text>,
    headerStyle: {
      backgroundColor: '#d50000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  useEffect(() => {
    navigation.setParams({ amount });     // check amount change, callback params
  }, [amount]);

  const addCartItem = (data) => {
    if ((amount >= data.price) && (data.qty > 0)) {   // Product Stock and Customer amount control
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: data
      })
      setAmount(amount - data.price)
    }
  }

  const deleteCardItem = (data) => {
    if ((basket.find((item) => item.id == data.id)?.sepetadet > 0)) {   // basket control: Has the product been added?
      dispatch({
        type: 'CART_DELETE_ITEM',
        payload: data
      })
      setAmount(amount + data.price)
    }
  }

  const Item = ({ ProductName, ProductPrice, ProductStock, id }) => (
    <ScrollView>
      <View>
        <View>
          <View style={style.main}>
            <View style={style.area}>
              <Text>{ProductName}</Text>
              <Text>Kalan {ProductStock - (basket.find((item) => item.id == id)?.sepetadet) ? (ProductStock - basket.find((item) => item.id == id)?.sepetadet) : ProductStock}</Text>
              <Text>{ProductPrice} TL</Text>
            </View>

            <View style={style.counter}>
              <TouchableOpacity style={style.button}
                onPress={() => {
                  deleteCardItem({
                    name: ProductName,
                    price: ProductPrice,
                    qty: ProductStock,
                    id: id
                  })
                }} >
                <Text style={style.count}>-</Text></TouchableOpacity>
              <Text style={style.count_weight}> {basket.find((item) => item.id == id)?.sepetadet} </Text>
              <TouchableOpacity style={style.button}
                onPress={() => {
                  addCartItem({
                    name: ProductName,
                    price: ProductPrice,
                    qty: ProductStock,
                    id: id
                  })
                }}
              ><Text style={style.count}>+</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );


  const renderItem = ({ item }) => (         //FlatList Render Item
    <Item key={item.id} ProductName={item.name} ProductStock={item.qty} ProductPrice={item.price}
      id={item.id} />
  );


  return (
    <SafeAreaView>
      <FlatList
        data={basket.filter(item => item.sepetadet > 0)}
        renderItem={renderItem}
        keyExtractor={product => product.id}
      />
      <View style={style.footer}>
        <View style={{ marginBottom: 20 }}>
          <Text style={style.text}>Toplam: {firstAmount - amount} TL</Text>
        </View>
      </View>
      <View >
        <TouchableOpacity style={style.button_footer} onPress={() => { setShowStatment(true); setAdminAmount(firstAmount - amount); navigation.navigate('AccountStatment') }}>
          <Text style={style.text}>Onayla</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

}


const style = StyleSheet.create({
  main: { backgroundColor: '#64ffda', margin: 15, padding: 15, },
  area: { justifyContent: "space-between", flexDirection: "row", display: "flex", marginHorizontal: 20 },
  counter: { justifyContent: "space-between", flexDirection: "row", display: "flex", marginTop: 15, marginHorizontal: 60 },
  button: { padding: 5, backgroundColor: '#bdbdbd' },
  count: { fontWeight: "600", paddingHorizontal: 5 },
  count_weight: { fontWeight: "700", fontSize: 20 },
  footer: { alignItems: 'center'},
  text: { fontWeight: '400', fontSize: 30, },
  button_footer: { marginHorizontal: 100, alignItems: 'center', backgroundColor: '#bdbdbd', },
  bar: { color: 'white', marginRight: 15 }
})
