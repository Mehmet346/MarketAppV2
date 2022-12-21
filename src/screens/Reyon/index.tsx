import React, { useContext, useEffect } from 'react';
import { SafeAreaView, ScrollView, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Store } from '../utils/Store';


function Product({ navigation }) {

  const { state, dispatch, amount, setAmount } = useContext(Store)
  const { basket } = state;

  Product.navigationOptions = ({ }) => ({
    title: 'Market',
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
    navigation.setParams({ amount });
  }, [amount]);

  const addCartItem = (data) => {
    if((amount >= data.price) && (data.qty > 0)) {
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: data
      })
      setAmount(amount - data.price)
    }
  }

  const deleteCardItem = (data) => {
    if((basket.find((item) => item.id == data.id)?.sepetadet > 0 )) {
      dispatch({
        type: 'CART_DELETE_ITEM',
        payload: data
      })
      setAmount(amount + data.price)
    }
  }

  const products = [
    {
      name: 'product_1',
      qty: 20,
      id: 1,
      price: 10,
    },
    {
      name: 'product_2',
      qty: 20,
      id: 2,
      price: 10,
    },
    {
      name: 'product_3',
      qty: 20,
      id: 3,
      price: 10,
    },
    {
      name: 'product_4',
      qty: 20,
      id: 4,
      price: 10,
    }
  ];

  const Item = ({ ProductName, ProductPrice, ProductStock, id }) => (
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
              }} ><Text style={style.count}>-</Text></TouchableOpacity>
            <Text style={style.count_weight}> {(basket.find((item) => item.id == id)?.sepetadet) ? (basket.find((item) => item.id == id)?.sepetadet) : 0} </Text>
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
  );


  const renderItem = ({ item }) => (
    <Item key={item.id} ProductName={item.name} ProductStock={item.qty} ProductPrice={item.price}
      id={item.id} />
  );


  return (
    <SafeAreaView>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={product => product.id}
      />
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
  bar: { color: 'white', marginRight: 15 }
})

export default Product;
