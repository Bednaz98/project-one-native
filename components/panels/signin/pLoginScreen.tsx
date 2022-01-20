import React, { useState } from "react"
import HTTPRequestHandler from "../../../Project1-GitUtil-Reimbursement/Classes/HTTPRequestHandler"
import { LoginReturn } from "../../../Project1-GitUtil-Reimbursement/Types/dto"
import { ContextObject, sysContext, SysReducerAction } from "../../wrappers/wProviderWrapper"


export default function LoginScreen(props){
    // Basic setup to get all context and dispatcher short hand %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    const FoundContext = React.useContext(sysContext)
    /**this function is used get to grab the HTTP handler as a short hand*/

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    const dispatchCreateScreen = props.dispatch
    const [userPassword, setStatePassword] = useState('')
    const [userName, setStateUserName] = useState('')

    async function TryLogin(){
        let Login:LoginReturn;
        try {
            const TempHelper = FoundContext.HTTPHandler
            Login = await TempHelper.Login(userName,userPassword)
            if(Login.ReturnProfile.id){
                FoundContext.setUserProfile({...Login.ReturnProfile}); 
                FoundContext.SetHTTPHandler(TempHelper )
            }

        } catch (error) {
            console.log("Login Failed")
        }
        
    }

    function SetPassword(event){setStatePassword(event.target.value)};
    function SetUserName(event){setStateUserName(event.target.value)};

    return(<>
        <h1>Welcome to the new reimbursement system Website</h1>
        <table>
            <tbody>
                <tr> <td><h4>Username</h4> </td> <td><input onChange={SetUserName} type="text" size={30}/></td> </tr>
                <tr> <td><h4>Password</h4> </td> <td><input onChange={SetPassword} type="text" size={30}/></td> </tr>
                <tr> <button onClick={TryLogin}> Login </button></tr>
                <tr> <button onClick={()=> dispatchCreateScreen()}> Create an account?</button></tr>
            </tbody>
        </table>
    </>)
}