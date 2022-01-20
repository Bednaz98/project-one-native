import React, { useState } from "react"
import { Request } from "../../Project1-GitUtil-Reimbursement/Types/Entity"
import { RequestStatus } from "../../Project1-GitUtil-Reimbursement/Types/Enums"
import { sysContext } from "../wrappers/wProviderWrapper"


export default function ManagerStatusOpt(props){
    const SetRequestStatus:Function= props.SetRequestStatus
    const [Message, setMessage] = useState('')
    function SetAmount(event){setMessage(event.target.value)};

    function DisplayButtons(){
        return (<>
        <h3></h3><input type="text" onChange={SetAmount} />
        <table>
            <tbody>
                <td><button onClick={ ()=> {SetRequestStatus(RequestStatus.Denied,Message)} } >  Deny   </button></td> 
                <td> <button onClick={ ()=> {SetRequestStatus(RequestStatus.Approved,Message)} } > Approve </button> </td>
            </tbody>
        </table>
        </>)
    }

    return(<>
    {DisplayButtons()}
    </>)
}