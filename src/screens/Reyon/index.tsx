import React, {useState, useContext, useEffect} from 'react';
import { SafeAreaView, ScrollView, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PracticeContext } from '../Global/PracticeContext';


 function Product({navigation}) {
    const {
        product,
        setProduct,
        amount,
        setAmount
        } = useContext(PracticeContext)
        

        Product.navigationOptions = ({}) => ({
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

        const Item = ({ ProductName, ProductPrice, ProductStock }) => (
            <View>
                <View>
                     <View style={style.main}>
                        <View style={style.area}>
                            <Text>{ProductName}</Text>
                            <Text>Kalan {ProductStock}</Text>
                            <Text>{ProductPrice} TL</Text>
                        </View>
                                                    
                    <View style= {style.counter}>
                        <TouchableOpacity style={style.button} ><Text style={style.count}>-</Text></TouchableOpacity>
                        <Text style={style.count_weight}> {ProductStock} </Text>
                        <TouchableOpacity style={style.button}><Text style={style.count}>+</Text></TouchableOpacity>
                        </View>
                    </View>
             </View>
            </View>
          );
          
        
            const renderItem = ({ item }) => (
              <Item ProductName={item.ProductName} ProductStock={item.ProductStock} ProductPrice={item.ProductStock} />
            );
          
        
    return (
   <SafeAreaView>
      <FlatList
        data={product.data}
        renderItem={renderItem}
        keyExtractor={product => product.id}
      />
    </SafeAreaView>
    );

}

const style = StyleSheet.create({
    main: { backgroundColor: '#64ffda', margin: 15, padding: 15,},
    area: { justifyContent: "space-between", flexDirection: "row", display: "flex" , marginHorizontal: 20},
    counter:{justifyContent: "space-between", flexDirection: "row", display: "flex", marginTop: 15, marginHorizontal: 60},
    button: {padding:5, backgroundColor: '#bdbdbd'},
    count: {fontWeight: "600", paddingHorizontal: 5},
    count_weight: {fontWeight: "700", fontSize:20},
    bar:{color: 'white', marginRight: 15}
})

Product.navigationOptions = {
    title: 'Market',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

export default Product;