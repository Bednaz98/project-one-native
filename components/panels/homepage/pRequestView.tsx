import React from "react"
import { useEffect, useState } from "react"
import { Request } from "../../../Project1-GitUtil-Reimbursement/Types/Entity"
import { RequestStatus } from "../../../Project1-GitUtil-Reimbursement/Types/Enums"
import RequestSelectButton from "../../element/eRequestSelectButton"
import { sysContext } from "../../wrappers/wProviderWrapper"
import {v4} from 'uuid';
import RequestDisplay from "../../element/eRequestDisplay"


export default function RequestView(props){
    const ManagerMode:boolean = props.ManagerMode
    const FoundContext = React.useContext(sysContext)

    // Initialization vars=============================
    const NullRequest:Request = {Amount: 0, RequestStatus:0,PostDate: 0}
    const Type: RequestStatus = RequestStatus.All
    //=================================================
    const [RequestID, setSetRequest] = useState(NullRequest)
    const [RequestType, setRequestType] = useState(Type)
    const [ButtonDisplay, setButtonDisplay] = useState([<></>])


    useEffect(() => {
        setButtonDisplay([<></>])
        DisplayRequestButtons();

        return () => {}}, []);

        async function SetRequestStatus(type:RequestStatus, Message:string){
            switch(type){
                case RequestStatus.deleted:{   
                    const t = await FoundContext.HTTPHandler.DeleteRequest(FoundContext.readUserProfile.id,RequestID.id )
                    if(t.ResultCheck){
                        const temp = RequestID;
                        temp.RequestStatus = RequestStatus.deleted;
                        setSetRequest({...temp});
                        DisplayRequestButtons()
                    }
                    ;break
                }
                case RequestStatus.Denied:{   
                    const t = await FoundContext.HTTPHandler.ManagerChangeRequest(FoundContext.readUserProfile.id,RequestID.id,RequestStatus.Denied, Message )
                    if(t){
                        const temp = RequestID;
                        temp.RequestStatus = RequestStatus.Denied;
                        setSetRequest({...temp});
                        DisplayRequestButtons()
                    }
                    ;break
                }
                case RequestStatus.Approved:{   
                    const t = await FoundContext.HTTPHandler.ManagerChangeRequest(FoundContext.readUserProfile.id,RequestID.id,RequestStatus.Approved, Message )
                    if(t){
                        const temp = RequestID;
                        temp.RequestStatus = RequestStatus.Approved;
                        setSetRequest({...temp});
                        DisplayRequestButtons()
                    }
                    ;break
                }
            }
        }

    async function DisplayRequestButtons(){
        if(ManagerMode){
            const transferArray = await FoundContext.HTTPHandler.GetAllSentRequestOfType(FoundContext.readUserProfile.id,RequestType )
            console.log(transferArray)
            if(! (transferArray.ReturnRequestArray.length >0) ) { 
                setButtonDisplay([<h4> No request found </h4>] )
                return;
            } 
            setButtonDisplay(   transferArray.ReturnRequestArray.map( (e)=> <tr><RequestSelectButton key = {v4()} InputRequest ={e} setSetRequest={setSetRequest}/></tr>) )
            
        }
        else{
            const transferArray = await FoundContext.HTTPHandler.ManagerGetAllRequest(FoundContext.readUserProfile.id)
            console.log(transferArray)
            if(! (transferArray.ReturnRequestArray.length >0) ) { 
                setButtonDisplay([<h4> No request found </h4>] )
                return;
            } 
            setButtonDisplay(   transferArray.ReturnRequestArray.map( (e)=> <tr><RequestSelectButton key = {v4()} InputRequest ={e} setSetRequest={setSetRequest}/></tr>) )

        }
        
    }

    function RequestTitle(){
        if(ManagerMode){return(<>Incoming Request</>)}
        return(<>Your  Request</>)
    }

    return( <>
        <h2>Your Request</h2>
        <table>
            <thead> <td>{RequestTitle()}</td> <td>||</td> <td>Selected Request</td> </thead>
            <tbody>
                <td>{ButtonDisplay}</td>
                <td>||</td>
                <td><RequestDisplay RequestID={ RequestID} ManagerMode={ManagerMode}   SetRequestStatus= {SetRequestStatus}/></td>
            </tbody>
        </table>

    </>)
}