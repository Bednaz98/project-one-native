import React, { useState } from "react"
import HomePage from "../page/HomePage"
import NoConnectionScreen from "../page/NoConnectionScreen"
import { ContextObject,SysReducerAction, sysContext } from "./wProviderWrapper"
import SignInSwitcher from "./wSigninSwitcher"



export default function ConnectionSwitcher(){
    // Basic setup to get all context and dispatcher short hand %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    let FoundContext:ContextObject;
    FoundContext = React.useContext(sysContext)
    /**this function is used get to grab the HTTP handler as a short hand*/
    const [isLoaded, setIsLoaded] = useState(false)
    async function checkConnection(){ 
        try {
            const value = await FoundContext.HTTPHandler.CheckConnection();
            setIsLoaded(value)
        } catch (error) {
            setIsLoaded(false)
        }
    }

    function switchPage(){
        checkConnection()
        if(!isLoaded){return <NoConnectionScreen/>}
        if(!FoundContext.readUserProfile?.id){return <SignInSwitcher/>}
        return <HomePage/>
    }
    return(<>{switchPage()} </>)
}