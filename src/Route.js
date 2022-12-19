import React from 'react';

import { createAppContainer, createSwitchNavigator} from "react-navigation";
import { createStackNavigator} from "react-navigation-stack";
import { createBottomTabNavigator} from "react-navigation-tabs";

import Login from './screens/Login/index'
import AuthRedirect from './screens/AuthRedirect'
import Rayon from './screens/Reyon/index'
import Basket from './screens/Sepet/index'
import AccountStatment from './screens/HesapDokumu/index';
import Admin from './screens/Admin/index';

const RayonStack = createStackNavigator({
    Rayon:{screen:Rayon}
})

const BasketStack = createStackNavigator({
    Basket:{screen:Basket}
})

const AccountStatmentStack = createStackNavigator({
    AccountStatment:{screen:AccountStatment}
})

const AdminStack = createStackNavigator({
    Admin:{screen:Admin}
})

const AuthenticateStack = createStackNavigator({
    Login: {
        screen:Login,
        navigationOptions:{
            header:null
        }
    }
});

const AppBottomNavigator = createBottomTabNavigator({
        Rayon:{
            screen:RayonStack,
            navigationOptions:{
                title:'Reyon',
            }
        },
        Basket:{
            screen:BasketStack,
            navigationOptions:{
                title: 'Sepet'
            }
        },
        AccountStatment:{
            screen:AccountStatmentStack,
            navigationOptions:{
                title: 'Hesap Dökümü'
            }
        },
        Admin:{
            screen:AdminStack,
            navigationOptions:{
                title:'Admin'
            }
        },
}, {
    tabBarOptions:{
        activeBackgroundColor:'#ec407a',
        inactiveBackgroundColor: '#c62828',
    }
}
)

const SwitchNavigator = createSwitchNavigator({
    App:AppBottomNavigator,
    //AuthRedirect,
    //Auth:AuthenticateStack
},{
    initialRouteName:'App'
})

export  default createAppContainer(SwitchNavigator);
