import { Request } from "../../Project1-GitUtil-Reimbursement/Types/Entity";
import { RequestStatus } from "../../Project1-GitUtil-Reimbursement/Types/Enums";
import {v4} from 'uuid';


export default function RequestSelectButton(props){
    const InputRequest:Request = props.InputRequest
    const setSetRequest:Function = props.setSetRequest
    function ConvertPostedDate(){
        const Display = (new Date(InputRequest?.PostDate)).toLocaleDateString()
        return Display;
    }
    function grabStatus(){
        return RequestStatus[InputRequest?.RequestStatus] ?? 'null';
    }

    return ( <>
    <button id = {v4()} onClick={()=> { setSetRequest(InputRequest);    }}>
        <h3>
        {ConvertPostedDate()}: {grabStatus() }
        </h3>
    </button>
    
    </>)
}