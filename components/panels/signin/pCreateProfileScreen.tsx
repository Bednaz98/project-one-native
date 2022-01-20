import React, { useState } from "react"
import { HTTPCreateProfile } from "../../../Project1-GitUtil-Reimbursement/Types/Entity";
import { ContextObject, sysContext, SysReducerAction } from "../../wrappers/wProviderWrapper"


export default function CreateProfileScreen(props){
    const dispatchCreateScreen = props.dispatch
    // Basic setup to get all context and dispatcher short hand %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    let FoundContext:ContextObject;
    FoundContext = React.useContext(sysContext)
    /**this function is used get to grab the HTTP handler as a short hand*/
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    const [userPassword, setStatePassword] = useState('')
    const [userName, setStateUserName] = useState('')
    const [userFirstName, setStateFirstName] = useState('')
    const [userLastName, setStateLastName] = useState('')

    function SetPassword(event){setStatePassword(event.target.value)};
    function SetUserName(event){setStateUserName(event.target.value)};
    function SetFirstName(event){setStateFirstName(event.target.value)};
    function SetLastName(event){setStateLastName(event.target.value)};
    async function TryCreateProfile(){
        const InitProfile:HTTPCreateProfile = { FirstName: userFirstName,LastName: userLastName,Password: userPassword,id: userName};
        const TempHelper = FoundContext.HTTPHandler
        const UserProfile = await TempHelper.CreateProfile(InitProfile)
        if(UserProfile.ReturnProfile){ 
            FoundContext.SetHTTPHandler(TempHelper);
            FoundContext.setUserProfile(UserProfile.ReturnProfile) }
    }

    return (<>
        <h1>Create a Profile</h1>
        <table>
            <tbody>
                <tr> <td><h4>First Name</h4> </td> <td><input onChange={SetFirstName} type="text" size={30}/></td> </tr>
                <tr> <td><h4>Last Name</h4> </td> <td><input  onChange={SetLastName} type="text" size={30}/></td> </tr>
                <tr> <td><h4>Username</h4> </td> <td><input  onChange={SetUserName} type="text" size={30}/></td> </tr>
                <tr> <td><h4>Password</h4> </td> <td><input   onChange={SetPassword} type="text" size={30}/></td> </tr>
                <tr> <button onClick={()=> TryCreateProfile()}> Create </button></tr>
                <tr> <button onClick={()=> dispatchCreateScreen()}> Back </button></tr>
            </tbody>
        </table>
    </>)
}