import React, { useReducer, useState } from "react"
import { View } from "react-native";
import { getDevViewStyle } from "../../BasicComponents/StyleSheet";
import CreateProfileScreen from "../panels/signin/pCreateProfileScreen"
import LoginScreen from "../panels/signin/pLoginScreen"

function reducer(State:boolean,action:any){ return !(State); }
const initState:boolean = false;

export default function SignInSwitcher(){
    const [isCreateScreen, dispatchCreateScreen] =   useReducer(reducer, initState);

    function SignInView(){
        if(isCreateScreen)  {return <CreateProfileScreen dispatch={dispatchCreateScreen}/>  }
        else                {return <LoginScreen dispatch={dispatchCreateScreen}/> }
    }

    return (
        <View style={{...getDevViewStyle(), padding:5, height:800, width:1300, alignItems:"center",justifyContent:"center"}}>
            {SignInView()}
        </View>
        )
}