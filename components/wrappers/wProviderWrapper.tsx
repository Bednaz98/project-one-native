import React, { useReducer, useState } from "react";
import { SafeAreaView } from "react-native";
import HTTPRequestHandler from "../../Project1-GitUtil-Reimbursement/Classes/HTTPRequestHandler";
import {Profile, Request} from '../../Project1-GitUtil-Reimbursement/Types/Entity';

/** Action for reducer function*/ 
export enum SysReducerAction{
    SetProfile
}



/**Object to content the state, dispatcher and initialized state*/
export interface ContextObject{
    HTTPHandler:HTTPRequestHandler
    readUserProfile:Profile 
    setUserProfile:React.Dispatch<React.SetStateAction<Profile>> 
    SetHTTPHandler:React.Dispatch<React.SetStateAction<HTTPRequestHandler>>,
    loading:boolean
    setLoading:React.Dispatch<React.SetStateAction<boolean>>
    dev:boolean
}


/**used to for default context values; assignment of null just for intellisense*/
const contextValue: ContextObject = {
    HTTPHandler: new HTTPRequestHandler('',-1),
    readUserProfile: {FirstName: "",LastName: ""},
    setUserProfile: ()=>{},
    SetHTTPHandler: ()=>{},
    loading:false,
    setLoading:()=>{},
    dev:true
}
export const sysContext = React.createContext(contextValue)



export default function SuperProvider( {children} ){
    const useProduction= true;
    const useURL:string =  (()=> {if(useProduction) {return'https://project-one-backend-joshuabednaz.azurewebsites.net';} else{''}})()
    const usePort:number = (()=>{if(useProduction){return -1} else{return 3001}  }  )()
    const temp:Profile = {FirstName: "",LastName: ""}
    const [readUserProfile, setUserProfile] = useState(temp)
    const [HTTPHandler, setHTTPHandler] = useState(new HTTPRequestHandler( useURL,usePort))
    const [loading, setLoading] = useState(true);
    /**re-assignment so typescript is happy assign to 'any'*/
    const readState:ContextObject = {
        HTTPHandler: HTTPHandler,
        readUserProfile,
        setUserProfile: setUserProfile,
        SetHTTPHandler: setHTTPHandler,
        loading:loading,
        setLoading: setLoading,
        dev:!useProduction
    };


    return(<>
        <sysContext.Provider value = { {...readState} }>
                {children}
        </sysContext.Provider>
    
    </>)


}