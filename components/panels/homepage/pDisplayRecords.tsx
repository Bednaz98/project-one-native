import React, { useEffect, useState } from "react"
import { TransferRecords } from "../../../Project1-GitUtil-Reimbursement/Types/dto"
import { sysContext } from "../../wrappers/wProviderWrapper"


export default function DisplayRecords(){
    const FoundContext = React.useContext(sysContext)
    const [EntryDisplay, setEntry] = useState([<></>])

    async function DisplayRecords(){
        const Result:TransferRecords = await FoundContext.HTTPHandler.ManagerGetRecords()
        setEntry( Result.ReturnRecords.map((   (e)=><> <li>  <h4>{e}</h4>   </li> </> ) )   )
    }

    useEffect(() => {
        DisplayRecords()
        return () => {};}, []);
    

    return(<>
    <h2> Records </h2>
    <ul>
    {EntryDisplay}
    </ul>
    </>)
}