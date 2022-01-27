import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { StyleButton } from "../../BasicComponents/BasicComponent";
import { ContextObject, sysContext } from "../wrappers/wProviderWrapper";

export default function NavigationBar(props){
    const setActiveTab:React.Dispatch<React.SetStateAction<number>> = props.setFunc;
    const [level, setPermissionLevel] = useState(0);
    const  FoundContext:ContextObject =React.useContext(sysContext)

    async function setPermissions(){
        const CheckResult1 = await FoundContext.HTTPHandler.CheckManagerPermissions()
        if(CheckResult1.ResultCheck){
            const CheckResult2 = await FoundContext.HTTPHandler.CheckAdminPermissions()
            if(CheckResult2.ResultCheck){setPermissionLevel(2)}
            else{setPermissionLevel(1)}
        }
        else{setPermissionLevel(0)}
    }
    
    useEffect(() => {
        setPermissions()
        return () => {};},);
    

    function ShowManagerOpts(){
        if(level>0){
            return (<>
                    <View > {StyleButton(()=>setActiveTab(3), 'Manage Request')} </View>
                    <View > {StyleButton(()=>setActiveTab(4), 'Statistics')} </View>
                </>)
        }
    }
    function ShowAdminOpt(){
        if(level>1){
            return(<>
            <View > {StyleButton(()=>setActiveTab(5), 'Admin Tools')} </View>
            </>)}
        }


    return (
        <View style={[ {   flexDirection: "row"  }]}>
            <View > {StyleButton(()=>setActiveTab(0), 'Your Profile')} </View>
            <View > {StyleButton(()=>setActiveTab(1), 'Your Request')} </View>
            <View > {StyleButton(()=>setActiveTab(2), 'Make Request')} </View>
            {ShowManagerOpts()}
            {ShowAdminOpt()} 
            
        </View>
    )
}
