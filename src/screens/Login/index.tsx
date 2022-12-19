import React, {Component} from 'react';
import { View,SafeAreaView,Text,TouchableOpacity,StyleSheet,TextInput } from 'react-native';
import * as Yup from "yup";
import {Formik} from "formik";

export default  class Index extends Component {


    constructor() {
        super();
        this.state = {
            hidePassword:true
        }
    }
    _handleSubmit = (values) => {

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
                                    <TextInput
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        placeholder={"Email"}
                                        keyboardType={"email-address"}
                                        placeholderTextColor={"#302D4C"}
                                        style={style.input}/>
                                    {(errors.email) && <Text style={style.error}>{errors.email}</Text>}
                                    <View>
                                    <TextInput
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        placeholder={"Şifre"}
                                        placeholderTextColor={"#302D4C"}
                                        secureTextEntry={this.state.hidePassword}
                                        style={style.input}/>
                                      <TouchableOpacity onPress={()=>this.setState({ hidePassword:!this.state.hidePassword})} style={{ position:'absolute',right:15,top:15}}>
                                          
                                      </TouchableOpacity>
                                    {(errors.password) && <Text style={style.error}>{errors.password}</Text>}
                                    </View>

                                    <TouchableOpacity
                                        disabled={!isValid}
                                        onPress={handleSubmit}
                                        style={style.button}>
                                        <Text style={style.button_text}>Giriş Yap</Text>
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
        backgroundColor:'#F7F7F7',
        padding:15,
        width:300,
        height:50,
        borderRadius:10,
        paddingHorizontal:25,
        marginBottom:10
    },
    forgot:{
        flexDirection:'row',justifyContent:'flex-end',
        marginTop:10,
        color:'#706E83'
    },
    button:{
        backgroundColor: '#7165E3',
        padding:20,
        marginTop:45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems:'center'
    },
    button_text:{
        color:'white',
        fontWeight:'600',
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
    }
})
