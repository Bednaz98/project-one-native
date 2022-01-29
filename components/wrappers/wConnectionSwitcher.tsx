import React, { useEffect, useState } from "react"
import { View } from "react-native"
import loadingIcon, { StyleText } from "../../BasicComponents/BasicComponent"
import { textType } from "../../BasicComponents/StyleSheet"
import HomePage from "../page/HomePage"
import NoConnectionScreen from "../page/NoConnectionScreen"
import { ContextObject,SysReducerAction, sysContext } from "./wProviderWrapper"
import SignInSwitcher from "./wSigninSwitcher"



export default function ConnectionSwitcher(){
    // Basic setup to get all context and dispatcher short hand %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    const  FoundContext:ContextObject =React.useContext(sysContext)
    /**this function is used get to grab the HTTP handler as a short hand*/
    //{loadingIcon()}
    useEffect(() => {
        checkConnection()
        return () => {};}, []);
    
    const [isConnected, setConnected] = useState(false)
    async function checkConnection(){ 
        try {
            FoundContext.setLoading(true)
            const value = await FoundContext.HTTPHandler.CheckConnection();
            if(value){
                setConnected(value)
                FoundContext.setLoading(false)
            }
            else{ FoundContext.setLoading(false)}
        } catch (error) {
            FoundContext.setLoading(false)
            setConnected(false)
        }
    }

    function showLoadingScreen(){
        return(
        <View>
            {StyleText("Connecting to Servers",textType.PageTitle)}
            {loadingIcon()}
        </View>)

    }

    function switchPage(){
        if(!isConnected){
            if(FoundContext.loading){ 
                return (showLoadingScreen()  ) }
            else{ return <NoConnectionScreen/> }
        }
        else if(!FoundContext.readUserProfile?.id){
            if(FoundContext.loading){ 
                return (showLoadingScreen()  ) }
            else{ return <SignInSwitcher/> }
        }
        else{ return <HomePage/>}
    }
    return(<>{switchPage()} </>)
}