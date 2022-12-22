import React, {Component} from 'react';
import { View,SafeAreaView,Text,TouchableOpacity,StyleSheet,TextInput } from 'react-native';
import * as Yup from "yup";
import {Formik} from "formik";
import auth from '@react-native-firebase/auth';
export default  class Index extends Component {


    constructor() {
        super();
        this.state = {
            hidePassword:true
        }
    }
    _handleSubmit = (values) => {
        auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
               this.props.navigation.navigate('App');
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    alert('Wrong Password')
                    return;
                }

                if (error.code === 'auth/user-not-found') {
                  alert('User Not Found');
                  return;
                }

                console.error(error);
            });
    }

    render() {
        return (
            <SafeAreaView style={{ flex:1}}>
                <View style={{ backgroundColor:'white',justifyContent:'center',flex:1,flexDirection:'column',paddingVertical:50,alignItems:'center'}}>
                    <View style={{ alignItems:'center'}}>
                    </View>
                    <Formik
                        initialValues={{
                            email:'',
                            password:''
                        }}
                        onSubmit={this._handleSubmit}
                        validationSchema={
                            Yup.object().shape({
                                email:Yup.string().email().required('Email adresi boş olamaz'),
                                password:Yup.string().required('Şifre boş olamaz')
                            })
                        }
                    >
                        {
                            ({
                                 values,
                                 handleSubmit,
                                 isValid,
                                 errors,
                                 handleChange
                             }) => (
                                
                                <View style={style.form}>
                                    <Text style={style.text}>KULLANICI ADI</Text>
                                    <TextInput
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        keyboardType={"email-address"}
                                        placeholderTextColor={"#302D4C"}
                                        style={style.input}/>
                                    <Text style={style.text}>PAROLA</Text>
                                    <View>
                                    <TextInput
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        placeholderTextColor={"#302D4C"}
                                        secureTextEntry={this.state.hidePassword}
                                        style={style.input}/>
                                      <TouchableOpacity onPress={()=>this.setState({ hidePassword:!this.state.hidePassword})} style={{ position:'absolute',right:15,top:15}}> 
                                      </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                        disabled={!isValid}
                                        onPress={handleSubmit}
                                        style={style.button}>
                                        <Text style={style.button_text}>Giriş</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </Formik>
                </View>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    hero: { color:'#1C1939',fontWeight:'600',fontSize:40},
    hero_description:{ color:'rgba(26,25,57,0.8)',fontSize:17,marginTop:15,fontWeight:'500'},
    form:{ flex:1,marginTop:80},
    input:{
        backgroundColor:'#bdbdbd',
        padding:15,
        width:300,
        height:50,
        paddingHorizontal:25,
        marginBottom:10
    },
    button:{
        backgroundColor: '#bdbdbd',
        padding:10,
        marginTop:45,
        justifyContent: 'center',
        alignItems:'center',
        marginHorizontal: 70
    },
    button_text:{
        color:'black',
        fontWeight:'400',
        fontSize:18,
        textAlign:'center'
    },
    bottom:{
        alignItems: 'center',
        justifyContent:'center',
        marginTop:20,
    },
    error:{
        color:'red'
    },
    text:{
        color: 'black',
        marginBottom: 10,
        marginLeft: 7
    }
})
