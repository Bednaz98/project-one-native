import React from "react";
import { View } from "react-native";
import { StyleButton } from "../../BasicComponents/BasicComponent";
import { buttonType } from "../../BasicComponents/StyleSheet";


export default function AdminNavBar(props){
    const setAdminIndex:React.Dispatch<React.SetStateAction<number>> = props.setAdminIndex

    return(
    <View style={[ {   flexDirection: "row", justifyContent:"center", alignContent:"center"  }]}>
        <View> {StyleButton(()=>{setAdminIndex(0)}, 'View All Profiles',buttonType.adminStyle )} </View>
        <View> {StyleButton(()=>{setAdminIndex(1)}, 'View All Request',buttonType.adminStyle)} </View>
        <View> {StyleButton(()=>{setAdminIndex(2)}, 'Create Profile',buttonType.adminStyle)} </View>
        <View> {StyleButton(()=>{setAdminIndex(4)}, 'Delete Profile',buttonType.adminStyle)} </View>
        <View> {StyleButton(()=>{setAdminIndex(3)}, 'Assign Manager',buttonType.adminStyle)} </View>
        <View> {StyleButton(()=>{setAdminIndex(4)}, 'Un-Assign Manager',buttonType.adminStyle)} </View>
    </View>)
}