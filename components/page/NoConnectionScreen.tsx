import { View, Text } from "react-native"



export default function NoConnectionScreen(){
    return(
        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
            <Text style={{ fontSize:100, color:"floralwhite" }} >Sorry, Cannot Connect...</Text>
            <Text style={{ fontSize:40, color:"floralwhite" }}>The Server might be down, try again later</Text>
        </View>)
}