import React, { useEffect, useState } from "react"
import { sysContext } from "../../wrappers/wProviderWrapper"


export default function UserProfile(){
    const FoundContext = React.useContext(sysContext)
    function getProfileValues(){
        return FoundContext.readUserProfile;
    }

    const [managerName, setManagerName] = useState('Not Assigned a manager')
    async function GetManagerName(){
        const Result = await FoundContext.HTTPHandler.GetManagerName('')
        if(Result.ReturnString.length > 1) { setManagerName(Result.ReturnString)  }
    }

    useEffect(() => {
        GetManagerName()
        return () => { } }, [])

    return (<>
        <h1>Your Profile</h1>
        <table>
            <tbody>
            <tr> <td><h4>UserName</h4></td>         <td>    <input defaultValue={ getProfileValues().id} type="text" size={30}/></td> </tr>
            <tr> <td><h4>First Name</h4> </td>      <td>    <input defaultValue={ getProfileValues().FirstName} type="text" size={30}/></td> </tr>
            <tr> <td><h4>Last Name</h4></td>        <td>    <input defaultValue={ getProfileValues().LastName} type="text" size={30}/></td> </tr>
            <tr> <td><h4>Password</h4> </td>        <td>    <input defaultValue={ getProfileValues().Password} type="text" size={30}/></td> </tr>
            <tr> <td><h4>Manager</h4> </td>         <td>    <h4> {managerName } </h4> </td> </tr>
            </tbody>
        </table>
    </>)
}