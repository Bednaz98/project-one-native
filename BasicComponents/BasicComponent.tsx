import { ButtonColor, buttonType, InputTextComponentStyle, InputTextType, TextStyle, textType, iTSB} from "./StyleSheet";
import { View, Text, Button, TextInput, SafeAreaView } from "react-native";


export enum TextJustification{

}
export function StyleText(text:string,type:textType =textType.GeneralText  ){
    return( <View style={[{padding: 3, alignContent:"center"}]} ><Text style={ TextStyle(type)}>{text}</Text></View>)
}

export function StyleButton(func:Function, text:string,type:buttonType =buttonType.normal, enabled:boolean = true ){
    return (<View  style={[{padding: 3}]} ><Button onPress={(e)=> {
        try {
            func(e)
        } catch (error) {
            console.log(` the current function input for this button is not callable ${func}`)
        }}
    } title={text} color={ButtonColor(type)}  disabled={!enabled}/></View>)
}

export function StyleInputText(onChangeText:Function,Label:string,textValue:string, ShowSubmit:boolean = false, subFunc?:Function ,type:InputTextType=InputTextType.normal){
    function ShowSubmitButton(){
        if(ShowSubmit)  { return <View style={{flex:1}}> {StyleButton(subFunc, 'Submit', buttonType.inputField )} </View> }
    }

    return (
        <View style={[{padding: 3}]}> 
            <View style={[ {flexDirection: "row", }, iTSB(type)]}>
                <View  style={{flex:2}}> {StyleText(Label,textType.InputText )}</View>
                <View  style={[{flex:4, padding: 4}]}> <TextInput  style={ InputTextComponentStyle(type)}  onChangeText={(e)=>onChangeText(e)} value={textValue}/></View>
                {ShowSubmitButton()}
            </View>
        </View>
        
    )
}