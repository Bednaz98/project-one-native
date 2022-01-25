import React, { useState } from "react";
import { View } from "react-native";
import AdminNavBar from "./AdminNavBar";


export default function AdminPage(){
    const [adminIndex, setAdminIndex] = useState(0);

    return(
    <View>
        <View> <AdminNavBar setAdminIndex={setAdminIndex}/>  </View>
    </View>)
}