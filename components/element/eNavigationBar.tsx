import React from "react";
import { Button, View } from "react-native";
import { StyleButton } from "../../BasicComponents/BasicComponent";

export default function NavigationBar(props){
    const setActiveTab:React.Dispatch<React.SetStateAction<number>> = props.setFunc;
    return (
        <View style={[ {   flexDirection: "row"  }]}>
            <View > {StyleButton(()=>setActiveTab(0), 'Your Profile')} </View>
            <View > {StyleButton(()=>setActiveTab(1), 'Your Request')} </View>
            <View > {StyleButton(()=>setActiveTab(2), 'Make Request')} </View>
            <View > {StyleButton(()=>setActiveTab(3), 'Manage Request')} </View>
            <View > {StyleButton(()=>setActiveTab(4), 'Statistics')} </View>
            <View > {StyleButton(()=>setActiveTab(5), 'Admin Tools')} </View>
        </View>
    )
}

{/* <table> 
            <tbody>
                <tr><td><button onClick={()=> {switchTab(0)} }>Your Profile</button></td>
                    <td><button onClick={()=> {switchTab(1)} }>View Your Reimbursement</button></td>
                    <td><button onClick={()=> {switchTab(2)} }>Make a Reimbursement Request</button></td>
                    <td><button onClick={()=> {switchTab(3)} }>Manage Reimbursement</button></td>
                    <td><button onClick={()=> {switchTab(4)} }>Stats</button></td>
                </tr>
            </tbody>
        </table> */}