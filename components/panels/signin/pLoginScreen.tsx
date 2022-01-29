import React, { useState } from "react"
import { View } from "react-native"
import loadingIcon, { StyleButton, StyleInputText, StyleText } from "../../../BasicComponents/BasicComponent"
import { colorScheme, GetColor, textType } from "../../../BasicComponents/StyleSheet"
import { LoginReturn } from "../../../Project1-GitUtil-Reimbursement/Types/dto"
import { sysContext } from "../../wrappers/wProviderWrapper"


export default function LoginScreen(props){
    // Basic setup to get all context and dispatcher short hand %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    const FoundContext = React.useContext(sysContext)
    /**this function is used get to grab the HTTP handler as a short hand*/

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    const dispatchCreateScreen = props.dispatch
    const [userPassword, setStatePassword] = useState('')
    const [userName, setStateUserName] = useState('')
    const [logError, setLogError] = useState(false);

    async function TryLogin(){
        let Login:LoginReturn;
        try {
            setLogError(false)
            const TempHelper = FoundContext.HTTPHandler
            console.log('http handler being called')
            Login = await TempHelper.Login(userName,userPassword)
            console.log('http handler complete')
            if(Login.ReturnProfile.id){
                FoundContext.setUserProfile({...Login.ReturnProfile}); 
                FoundContext.SetHTTPHandler(TempHelper )
            }
            else{setLogError(true)}

        } catch (error) {
            setLogError(true)
        }
    }

    function DisplayNotFound(){
        if(logError){
            return( 
                <View style={{backgroundColor:GetColor(colorScheme.ColorB)}}>
                    {StyleText("This username or password does not match the server")}
                </View>)
        }
        else{return (<></>)}
    }

    return(
    <View style={{alignItems:"center",justifyContent:"center"}}>
        <View>
            {StyleText("Stark-Tower Reimburs ™", textType.PageTitle)} 
        </View>
        <View>
            <View style={ {   flexDirection: "column",   }}>
                <View >{StyleInputText(setStateUserName , "Username",userName)}   </View>
                <View >{StyleInputText(setStatePassword, "Password",userPassword)}   </View>
                <View style={[{   flexDirection: "row"  }]}> 
                    <View style ={[{flex:1}]}> {StyleButton(()=>dispatchCreateScreen(), "Create Profile")} </View>
                    <View style ={[{flex:1}]}> {StyleButton(()=>TryLogin(), "Login")}</View>
                </View>
            </View>
        </View>
        <View> { DisplayNotFound()} </View>

    </View>)
}