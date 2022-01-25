import React, { useState } from "react"
import { View, Text, Button, TextInput } from "react-native";
import { HTTPCreateProfile } from "../../../Project1-GitUtil-Reimbursement/Types/Entity";
import { textType } from "../../../BasicComponents/StyleSheet";
import { ContextObject, sysContext, SysReducerAction } from "../../wrappers/wProviderWrapper"
import {StyleInputText, StyleButton, StyleText } from "../../../BasicComponents/BasicComponent";


export default function CreateProfileScreen(props){
    const dispatchCreateScreen = props.dispatch
    // Basic setup to get all context and dispatcher short hand %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    let FoundContext:ContextObject;
    FoundContext = React.useContext(sysContext)
    /**this function is used get to grab the HTTP handler as a short hand*/
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    const [userPassword, setStatePassword] = useState('password')
    const [userName, setStateUserName] = useState('username')
    const [userFirstName, setStateFirstName] = useState('first name')
    const [userLastName, setStateLastName] = useState('last name')

    async function TryCreateProfile(){
        const InitProfile:HTTPCreateProfile = { FirstName: userFirstName,LastName: userLastName,Password: userPassword,id: userName};
        const TempHelper = FoundContext.HTTPHandler
        const UserProfile = await TempHelper.CreateProfile(InitProfile)
        if(UserProfile.ReturnProfile){ 
            FoundContext.SetHTTPHandler(TempHelper);
            FoundContext.setUserProfile(UserProfile.ReturnProfile) }
    }
    
    return (<>
        {StyleText("Create A Profile", textType.PageTitle)}
    <View style={[ {   flexDirection: "column"  }]}>
        <View >{StyleInputText(setStateFirstName, "First Name",userFirstName)}   </View>
        <View >{StyleInputText(setStateLastName, "Last Name", userLastName)}  </View>
        <View >{StyleInputText(setStateUserName, "Username", userName)}  </View>
        <View >{StyleInputText(setStatePassword, "Password", userPassword)} </View>
        <View style={[{   flexDirection: "row"  }]}> 
            <View style ={[{flex:1}]}> {StyleButton(()=>dispatchCreateScreen(), "Back to Login")} </View>
            <View style ={[{flex:1}]}> {StyleButton(()=>TryCreateProfile(), "Submit")}</View>
        </View>
    </View>
    </>)
}

