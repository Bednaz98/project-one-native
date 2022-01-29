import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { StyleButton } from "../../BasicComponents/BasicComponent";
import { ContextObject, sysContext } from "../wrappers/wProviderWrapper";

export default function NavigationBar(props){
    const change:React.Dispatch<React.SetStateAction<number>> = props.setFunc;
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
                    <View > {StyleButton(()=>change(3), 'Manage Request')} </View>
                    <View > {StyleButton(()=>change(4), 'Statistics')} </View>
                </>)
        }
        else{ return (<></>)}
    }
    function ShowAdminOpt(){
        if(level>1){
            return(<>
            <View > {StyleButton(()=>change(5), 'Admin Tools')} </View>
            </>)}
        }


    return (
        <View style={[ {   flexDirection: "row"  }]}>
            <View > {StyleButton(()=>change(0), 'Your Profile')} </View>
            <View > {StyleButton(()=>change(1), 'Your Request')} </View>
            <View > {StyleButton(()=>change(2), 'Make Request')} </View>
            {ShowManagerOpts()}
            {ShowAdminOpt()} 
            
        </View>
    )
}
