import React, { useState } from "react"
import { View } from "react-native"
import { StyleButton, StyleInputText, StyleText } from "../../../BasicComponents/BasicComponent"
import { buttonType, InputTextType, TextStyle, textType } from "../../../BasicComponents/StyleSheet"
import { TransferRequest } from "../../../Project1-GitUtil-Reimbursement/Types/dto"
import { sysContext } from "../../wrappers/wProviderWrapper"


export default function RequestCreation(){
    const FoundContext = React.useContext(sysContext)
    const [RequestAmount, setStateAmount] = useState(0)
    const [RequestMessage, setRequestMessage] = useState('General Request')
    const [ShowUpdateScreen, setShowUpdateScreen] = useState(false)
    const [SendEnabled, setSendEnabled] = useState(false)
    function ConvertAmountToText(ss:string){
        setStateAmount(Number(ss))
        setSendEnabled(true)
        setTimeout(()=>{
            if(RequestAmount < 0){ console.log(RequestAmount);setStateAmount(0); setSendEnabled(false) }
            if(RequestAmount === NaN) {console.log(RequestAmount);setStateAmount(0); setSendEnabled(false)} 
            if(String(RequestAmount) === 'NaN') {console.log(RequestAmount);setStateAmount(0); setSendEnabled(false)} 
        },500)
    }

    async function SendRequest(){
        const T:TransferRequest =  await FoundContext.HTTPHandler.MakeRequest('ID', RequestAmount,RequestMessage)
        if(T){
            setShowUpdateScreen(true); 
            setStateAmount(0);
            setRequestMessage('');
            return }
        else{
            setStateAmount(0);
            setRequestMessage('');
            console.log('Request failed');
        }
    }

    function RequestSubmitView(){
        return (<>
            <View>
                <View style={{padding:50}}> {StyleText('Thank you for making a request',textType.HeaderSection)} </View>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}/>
                    <View style={{flex:3}}> {StyleButton( ()=> setShowUpdateScreen(false), 'create new request')} </View>
                    <View style={{flex:1}}/>
                </View>
            </View>
        </>)
    }
    function RequestCreateView(){
        return(<>
            <View>
                <View style={{padding:10, alignItems:"center", justifyContent:"center"}}>
                    <View style={{alignContent:"center", justifyContent:"center"}}>
                        {StyleText("Create Your Request",textType.HeaderSection)} 
                    </View>
                    
                </View>
                <View >
                    {StyleInputText(ConvertAmountToText  , "Amount", (()=> { let temp = RequestAmount; return String(temp)}) () )}   
                </View>
                <View >
                    {StyleInputText( setRequestMessage , "Description",RequestMessage)} 
                </View>
                <View style={{padding:10, flexDirection:"row"}}>
                    <View style={{flex:1}}/>
                    <View style={{flex:3}} > {StyleButton(()=>{ SendRequest()},'Send Request',buttonType.normal,SendEnabled ) }  </View> 
                    <View style={{flex:1}}/>
                </View>
            </View>
        </>)
    }
    function SwitchDisplayView(){
        if(ShowUpdateScreen) {return RequestSubmitView()}
        else {return RequestCreateView()}
    }

    return (<>
        {SwitchDisplayView()}
    </>)
}
