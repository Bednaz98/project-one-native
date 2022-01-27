import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { StyleText } from "../../../BasicComponents/BasicComponent";
import { textType } from "../../../BasicComponents/StyleSheet";
import { TransferProfileArray } from "../../../Project1-GitUtil-Reimbursement/Types/dto";
import { sysContext } from "../../wrappers/wProviderWrapper";
import SingleProfileView from "./singleProfilebutton";




export default function AllProfileView(props){
    const FoundContext = React.useContext(sysContext)
    const [profileArray, setProfiles] = useState([<></>])
    const title:string = props.title

    async function setDisplay(){
        const Result:TransferProfileArray = await FoundContext.HTTPHandler.AdminGetAllEmployees()
        setProfiles( Result.ReturnProfileArray.map((   (profile)=><View> <SingleProfileView key={profile.id} profile={profile}/> </View> ) )   )
    }
    useEffect(() => {
        setDisplay()
        return () => {};}, []);
    

    return(
        <View style={{ justifyContent:"center", alignContent:"center", flexDirection:"column" }}>
            <View>{StyleText(title,textType.HeaderSection)}</View>
            <ScrollView>
                {profileArray}
            </ScrollView>
        </View>)

}