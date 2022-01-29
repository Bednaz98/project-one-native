import { ButtonColor, buttonType, InputTextComponentStyle, InputTextType, TextStyle, textType, iTSB, HorizontalLineStyle, ScrollViewStyle, ModalStyle, colorScheme, GetColor} from "./StyleSheet";
import { View, Text, Button, TextInput, ActivityIndicator, ScrollView, Modal} from "react-native";
import { StyleSheet } from 'react-native';
import React from "react";
import { sysContext } from "../components/wrappers/wProviderWrapper";



export function StyleText(text:string,type:textType = textType.GeneralText  ){
    return( <View > 
                <Text style={ {...TextStyle(type),alignContent:"center"} }> {text} </Text>  
            </View>)}


function buttonCheck(func:Function,e:any){
    try { func(e) } catch (error) { console.log(` the current function input for this button is not callable ${func}`) }
}
export function StyleButton(func:Function, text:string, type:buttonType =buttonType.normal, enabled:boolean = true ){
    return (
    <View  style={[ {   flexDirection: "column"  , justifyContent:"space-evenly",alignContent:"stretch", padding:3}]} >
        <Button onPress={(e)=> {buttonCheck(func, e) }} title={text} color={ButtonColor(type)}  disabled={!enabled}/>
    </View>)
}

export function StyleInputText(onChangeText:Function,Label:string,textValue:string, ShowSubmit:boolean = false, subFunc?:Function ,type:InputTextType=InputTextType.normal){
    function ShowSubmitButton(){
        if(ShowSubmit)  { return <View style={{flex:1}}> {StyleButton(subFunc, 'Submit', buttonType.inputField )} </View> }
    }

    return (
        <View style={[{padding: 3}]}> 
            <View style={[ {flexDirection: "row", }]}>
                <View  style={{flex:2}}> 
                    {StyleText(Label,textType.InputText )}
                </View>
                <View  style={[{flex:4, padding: 1,...iTSB(type)}]}> 
                    <TextInput  style={ InputTextComponentStyle(type)}  onChangeText={(e)=>onChangeText(e)} value={textValue}/>
                </View>
                {ShowSubmitButton()}
            </View>
        </View>
        
    )
}


export default function loadingIcon(){
    const FoundContext = React.useContext(sysContext)
    if(FoundContext.loading){ return( <ActivityIndicator/>) }
    else{return <></>}
    return (<></>)
}

export function HorizontalLine(){
    return (
    <View style={{padding:20}}>
        <View style={HorizontalLineStyle()} />
    </View>)
}

export function StyleScrollView({children}){
    return(
        <View>
            <ScrollView style={ScrollViewStyle()}>
                {children}
            </ScrollView>
        </View>
    )

}


export function StyleModal(modalVisible:boolean,setModalVisible:Function , children:JSX.Element){
    return(
        <View>
            <View style={{alignItems:"center",justifyContent:"center", backgroundColor:GetColor(colorScheme.ColorB)}}>
                <Modal style={ModalStyle().modalView}animationType="slide" transparent={true}  visible={modalVisible}  onRequestClose={ () =>{setModalVisible(!modalVisible)} } >
                    {children}
                </Modal>
            </View>
        </View>
    )
}


