import React, { useState } from "react"
import { View } from "react-native"
import { StyleButton, StyleInputText, StyleText } from "../../../BasicComponents/BasicComponent"
import { textType } from "../../../BasicComponents/StyleSheet"
import HTTPRequestHandler from "../../../Project1-GitUtil-Reimbursement/Classes/HTTPRequestHandler"
import { LoginReturn } from "../../../Project1-GitUtil-Reimbursement/Types/dto"
import { ContextObject, sysContext, SysReducerAction } from "../../wrappers/wProviderWrapper"


export default function LoginScreen(props){
    // Basic setup to get all context and dispatcher short hand %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    const FoundContext = React.useContext(sysContext)
    /**this function is used get to grab the HTTP handler as a short hand*/

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    const dispatchCreateScreen = props.dispatch
    const [userPassword, setStatePassword] = useState('')
    const [userName, setStateUserName] = useState('')

    async function TryLogin(){
        let Login:LoginReturn;
        try {
            const TempHelper = FoundContext.HTTPHandler
            console.log('http handler being called')
            Login = await TempHelper.Login(userName,userPassword)
            console.log('http handler complete')
            if(Login.ReturnProfile.id){
                FoundContext.setUserProfile({...Login.ReturnProfile}); 
                FoundContext.SetHTTPHandler(TempHelper )
            }

        } catch (error) {
            console.log('login failed',error)
        }
    }

    return(<>
        {StyleText("Welcome to Reimburse (TM)", textType.PageTitle)} 
        <View style={[ {   flexDirection: "column"  }]}>
        <View >{StyleInputText(setStateUserName , "Username",userName)}   </View>
        <View >{StyleInputText(setStatePassword, "Password",userPassword)}   </View>
            <View style={[{   flexDirection: "row"  }]}> 
                <View style ={[{flex:1}]}> {StyleButton(()=>dispatchCreateScreen(), "Create Profile")} </View>
                <View style ={[{flex:1}]}> {StyleButton(()=>TryLogin(), "Login")}</View>
            </View>
        </View>
    </>)
}