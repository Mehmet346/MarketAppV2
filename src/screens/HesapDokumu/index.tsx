import React, { useContext, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View } from "react-native";
import { Store } from '../utils/Store';

export default function AccountStatment({ navigation }) {

  const { state, amount, showStatment } = useContext(Store)
  const { basket } = state;

  AccountStatment.navigationOptions = ({ }) => ({   // static navigationOptions amount state control
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
    navigation.setParams({ amount });     // check amount change, callback params
  }, [amount]);

  const Item = ({ ProductName, ProductPrice, id }) => (
    <View >
      <View style={style.main}>
        <View style={style.area}>
          <Text style={style.product}>{ProductName}</Text>
          <Text style={style.product}>{ProductPrice} TL</Text>
        </View>

        <View style={style.counter}>
          <Text style={style.product}>ALINAN:</Text>
          <Text style={style.num}>{basket.find((item) => item.id == id)?.sepetadet}</Text>  
          <Text style={style.product}>Total: {basket.find((item) => item.id == id)?.sepetadet * ProductPrice} TL</Text> 
        </View>
      </View>
    </View>
  )

  const renderItem = ({ item }) => (
    <Item key={item.id} ProductName={item.name} ProductStock={item.qty} ProductPrice={item.price}
      id={item.id} />
  );
  return (
    <SafeAreaView>
      {(showStatment) &&    //You cannot see the account statement without confirming in the basket section. showStatment = false
      <FlatList
        data={basket.filter(item => item.sepetadet > 0)}
        renderItem={renderItem}
        keyExtractor={product => product.id}
      />}
    </SafeAreaView>
  );

}


const style = StyleSheet.create({
  main: { backgroundColor: '#64ffda', margin: 15, padding: 15, },
  area: { justifyContent: "space-between", flexDirection: "row", display: "flex", marginHorizontal: 20 },
  counter: { justifyContent: "space-between", flexDirection: "row", display: "flex", marginTop: 15, marginHorizontal: 60 },
  button: { padding: 5, backgroundColor: 'grey' },
  footer: { alignItems: 'center', marginTop: 200 },
  text: { fontWeight: '400', fontSize: 30, },
  button_footer: { marginHorizontal: 100, alignItems: 'center', backgroundColor: 'grey', },
  product: { paddingHorizontal: 5, paddingVertical: 3, marginTop: 10, fontWeight: 'bold' },
  num: { fontSize: 30, fontWeight: 'bold', },
  bar: { color: 'white', marginRight: 15 }
})

