import React, { useState } from "react"
import { TransferRequest } from "../../../Project1-GitUtil-Reimbursement/Types/dto"
import { sysContext } from "../../wrappers/wProviderWrapper"


export default function RequestCreation(){
    const FoundContext = React.useContext(sysContext)
    const [RequestAmount, setStateAmount] = useState(0)
    const [RequestMessage, setRequestMessage] = useState('')
    const [ShowUpdateScreen, setShowUpdateScreen] = useState(false)

    function SetAmount(event){setStateAmount(event.target.value)};
    function SetMessage(event){setRequestMessage(event.target.value)};

    async function SendRequest(){
        const T:TransferRequest =  await FoundContext.HTTPHandler.MakeRequest('', RequestAmount,RequestMessage)
        if(T){
            console.log('request made: ', T);  
            setShowUpdateScreen(true); 
            return }
        console.log('Request failed');
    }

    function RequestSubmitView(){
        return (<>
        <h2> Your Request has been sent to the server</h2>
        <button onClick={ ()=> setShowUpdateScreen(false)}> Create Another Request? </button>
        </>)
    }
    function RequestCreateView(){
        return(<>
        <h1>Make a Request</h1>
        <table>
            <tbody>
            <tr> <td><h4>Request Amount</h4></td>   <td>    <input defaultValue={ RequestAmount}    onChange={SetAmount} type="number" size={30}/></td> </tr>
            <tr> <td><h4> Added Message </h4> </td>    <td>    <input defaultValue={ RequestMessage}      onChange={SetMessage} type="text" size={30}/></td> </tr>
            </tbody>
        </table>
        <button onClick={ ()=>{SendRequest()} }>  Submit Request </button >
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