import React, { useEffect, useState } from "react"
import { View } from "react-native";
import { StyleButton, StyleInputText, StyleText } from "../../../BasicComponents/BasicComponent";
import { LoginReturn } from "../../../Project1-GitUtil-Reimbursement/Types/dto";
import { sysContext } from "../../wrappers/wProviderWrapper"


export default function UserProfile(){
    const FoundContext = React.useContext(sysContext)
    function getProfileValues(){
        return FoundContext.readUserProfile;
    }

    const [managerName, setManagerName] = useState('Not Assigned a manager')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    async function GetManagerName(){
        try {
            const Result = await FoundContext.HTTPHandler.GetManagerName(getProfileValues().ManagerID)
            if(Result.ReturnString.length > 1) { setManagerName(Result.ReturnString)  }
        } catch (error) {
            console.log('error trying to get manager name')
        }
    }

    useEffect(() => {
        setFirstName(getProfileValues().FirstName)
        setLastName(getProfileValues().LastName)
        setPassword(getProfileValues().Password)
        GetManagerName()
        return () => { } }, [])

        async function TryLogin(){
            let Login:LoginReturn;
            try {
                const TempHelper = FoundContext.HTTPHandler
                await TempHelper.LogOut()
                Login = await TempHelper.Login(FoundContext.readUserProfile.id,FoundContext.readUserProfile.Password)
                console.log('http handler complete')
                if(Login.ReturnProfile.id){
                    FoundContext.setUserProfile({...Login.ReturnProfile}); 
                    console.log(FoundContext.readUserProfile)
                    FoundContext.SetHTTPHandler(TempHelper )
                    setFirstName( FoundContext.readUserProfile.FirstName)
                    setLastName( FoundContext.readUserProfile.LastName)
                    setPassword( FoundContext.readUserProfile.Password)
                    GetManagerName()

                }
    
            } catch (error) {
                console.log('login failed',error)
            }
        }

        async function changeFirstName(){
            try {
                const ResultString = await FoundContext.HTTPHandler.ChangeFirstName(firstName,FoundContext.readUserProfile.id)
                console.log('change return: ',ResultString )
                if(ResultString){ setFirstName(ResultString.ReturnString)}
            } catch (error) {
                console.log('First name change error',error)
            }
        }
        async function changeLastName(){
            try {
                const ResultString = await FoundContext.HTTPHandler.ChangeLastName(lastName,FoundContext.readUserProfile.id)
                console.log('change return: ',ResultString )
                if(ResultString){ setLastName(ResultString.ReturnString)}
            } catch (error) {
                console.log('Last name change error',error)
            }
        }
        async function changePassword(){
            try {
                const ResultString = await FoundContext.HTTPHandler.ChangePassword(password,FoundContext.readUserProfile.id)
                console.log('change return: ',ResultString )
                if(ResultString){ setPassword(ResultString.ReturnString)}
            } catch (error) {
                console.log('Password name change error',error)
            }
        }



    return (<>
        <View>  
            <View style={{flexDirection:"row"}}>
                <View style={{flex:1}}/>
                <View style={{flex:3}}>  {StyleButton(()=>{TryLogin()}, 'Refresh')  }  </View>
                <View style={{flex:1}}/>
            </View>
            
            <View >{StyleText( `Username: ${FoundContext .readUserProfile.id} `) }   </View>
            <View >{StyleInputText(setFirstName , "First Name",firstName, true, ()=>{changeFirstName()})}   </View>
            <View >{StyleInputText(setLastName , "Last Name",lastName , true,()=>{changeLastName()})}   </View>
            <View >{StyleInputText(setPassword , "Password",password, true, ()=>{changePassword()})}   </View>
            <View style={{flexDirection:"row"}}>{StyleText('Manager: ')}  {StyleText(managerName)}  </View>
        </View>
    </>)
}

