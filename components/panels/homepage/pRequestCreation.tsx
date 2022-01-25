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
        const T:TransferRequest =  await FoundContext.HTTPHandler.MakeRequest('', RequestAmount,RequestMessage)
        if(T){
            setShowUpdateScreen(true); 
            setStateAmount(0);
            setRequestMessage('');
            return }
        console.log('Request failed');
    }

    function RequestSubmitView(){
        return (<>
            <View>
                <View style={{padding:50}}> {StyleText('Thank you for making a request',textType.HeaderSection)} </View>
                <View> {StyleButton( ()=> setShowUpdateScreen(false), 'create new request')} </View>
            </View>
        </>)
    }
    function RequestCreateView(){
        return(<>
            <View>
                <View style={{padding:50}}>{StyleText("Create Your Request",textType.HeaderSection)} </View>
                <View >{StyleInputText(ConvertAmountToText  , "Amount", (()=> { let temp = RequestAmount; return String(temp)}) () )}   </View>
                <View >{StyleInputText( setRequestMessage , "Description",RequestMessage)} </View>
                <View >{StyleButton(()=>{ SendRequest()},'Send Request',buttonType.normal,SendEnabled ) }  </View>
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

{/* <h1>Make a Request</h1>
        <table>
            <tbody>
            <tr> <td><h4>Request Amount</h4></td>   <td>    <input defaultValue={ RequestAmount}    onChange={SetAmount} type="number" size={30}/></td> </tr>
            <tr> <td><h4> Added Message </h4> </td>    <td>    <input defaultValue={ RequestMessage}      onChange={SetMessage} type="text" size={30}/></td> </tr>
            </tbody>
        </table>
        <button onClick={ ()=>{SendRequest()} }>  Submit Request </button > */}