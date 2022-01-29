import { View, Text } from "react-native"
import loadingIcon, { StyleText } from "../../BasicComponents/BasicComponent"
import { textType } from "../../BasicComponents/StyleSheet"



export default function NoConnectionScreen(){
    return(
        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
            {StyleText('Sorry, Cannot Connect...',textType.PageTitle)}
            {StyleText('The Server might be down, try again later',textType.HeaderSection)}
        </View>)
}