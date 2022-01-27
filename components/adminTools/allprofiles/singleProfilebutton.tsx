import { View } from "react-native";
import { StyleButton, StyleText } from "../../../BasicComponents/BasicComponent";
import { Profile } from "../../../Project1-GitUtil-Reimbursement/Types/Entity";


export default function SingleProfileView(props){
    const profile:Profile = props.profile

    return(<View>
        {StyleButton(()=>{},`${profile.FirstName} ${profile.LastName}` )}
    </View>)
}