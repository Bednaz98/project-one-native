import React, { useState } from "react";
import { View } from "react-native";
import { StyleText } from "../../BasicComponents/BasicComponent";
import AdminNavBar from "./AdminNavBar";
import AllProfileView from "./allprofiles/AllProfileView";


export default function AdminPage(){
    const [adminIndex, setAdminIndex] = useState(0);
    function switchAdminPage(){
        switch(adminIndex){
            case 0:     { return (  <View> <AllProfileView title={'All Profiles'}/>  </View>    )}
            default:    { return (  <View>{StyleText('Default testing') } </View>    )}
        }
    }

    return(
    <View style={{ flexDirection:'column', justifyContent:"center", alignContent:"center" }}>
        <View> <AdminNavBar setAdminIndex={setAdminIndex}/>  </View>
        <View>  {switchAdminPage()}  </View>
    </View>)
}