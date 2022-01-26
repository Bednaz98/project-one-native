import React, { useState } from "react"
import HomePage from "../page/HomePage"
import NoConnectionScreen from "../page/NoConnectionScreen"
import { ContextObject,SysReducerAction, sysContext } from "./wProviderWrapper"
import SignInSwitcher from "./wSigninSwitcher"



export default function ConnectionSwitcher(){
    // Basic setup to get all context and dispatcher short hand %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    const  FoundContext:ContextObject =React.useContext(sysContext)
    /**this function is used get to grab the HTTP handler as a short hand*/
    const [isConnected, setConnected] = useState(false)
    async function checkConnection(){ 
        try {
            const value = await FoundContext.HTTPHandler.CheckConnection();
            setConnected(value)
        } catch (error) {
            setConnected(false)
        }
    }

    function switchPage(){
        checkConnection()
        if(!isConnected){return <NoConnectionScreen/>}
        if(!FoundContext.readUserProfile?.id){return <SignInSwitcher/>}
        return <HomePage/>
    }
    return(<>{switchPage()} </>)
}