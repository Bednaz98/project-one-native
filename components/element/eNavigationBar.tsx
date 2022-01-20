import React from "react";
import { Button, View } from "react-native";

export default function NavigationBar(props){
    const {switchTab} = props;
    return (
        <View>
            <View> <Button onPress={switchTab(0)} title="Your Profile"/>
            </View>
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