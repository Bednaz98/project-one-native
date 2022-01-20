import React from "react"
import { useEffect } from "react"
import { sysContext } from "../wrappers/wProviderWrapper"
import { Request } from "../../Project1-GitUtil-Reimbursement/Types/Entity"
import { RequestStatus } from "../../Project1-GitUtil-Reimbursement/Types/Enums"
import ManagerStatusOpt from "./ManagerStatusOpt"



export default function RequestDisplay(props){
    const ManagerMode:boolean = props.ManagerMode
    const  SetRequestStatus:Function = props. SetRequestStatus
    const RequestID:Request =props.RequestID;
    const FoundContext = React.useContext(sysContext)
    useEffect(() => {
        return () => {  } }, [])
    
    function GetInputMessage(){
        if(RequestID.InputMessage?.length > 0){
            return(<>
            <table>
                <tbody>
                <tr> <td><h6> Filed Message: </h6> </td> <td> <h6> {RequestID.InputMessage} </h6></td> </tr>
                </tbody>
            </table>
            </>)
        }
    }
    function GetManagerMessage(){
        if(RequestID.ManagerMessage?.length > 0){
            return(<>
            <table>
                <tbody>
                <tr> <td><h6> Status Message: </h6> </td> <td> <h6> {RequestID.ManagerMessage} </h6></td> </tr>
                </tbody>
            </table>
            </>)
        }
    }

    function ButtonDisplay(){
        if(ManagerMode){ 
            if(RequestID.RequestStatus == RequestStatus.Pending ){
                console.log("show manager buttons")
                return (<ManagerStatusOpt SetRequestStatus={ SetRequestStatus}/> )
            }   
            return console.log('manager, dont display buttons')
        }
        if(RequestID.RequestStatus == RequestStatus.Pending ){
            console.log('show delete button')
            return (<><button onClick={ ()=>  SetRequestStatus(RequestStatus.deleted)}> Delete Request</button></>)
        }
        console.log('dont display any request buttons')
    }


    function RequestDisplay(){
        if(! (RequestID?.id)) { console.log('no request') ;return (<> <h3> selected a request </h3></>) }
        return(<>
                <table>
                    <tbody>
                        <tr> <td><h6>Post Date    : </h6> </td> <td> <h6> {(new Date(props.RequestID.PostDate)).toLocaleDateString()}</h6></td><td><h6>, Modified Date: </h6> </td> <td> <h6> {(new Date(props.RequestID.ModifiedDate)).toLocaleDateString()} </h6></td> </tr>
                        <tr> <td><h6>Status       : </h6> </td> <td> <h6> {RequestStatus[props.RequestID.RequestStatus] } </h6></td> <td><h6>, Amount       : </h6> </td> <td> <h6>  {props.RequestID.Amount}       </h6></td> </tr>
                    </tbody>
            </table>
            {}
            {GetInputMessage()}
            {ButtonDisplay()}
            {GetManagerMessage()}
            </>)
    }

    return ( <> 
        {RequestDisplay()}
    </>)
}