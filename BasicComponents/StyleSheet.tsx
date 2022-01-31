import React from "react"
import { StyleSheet} from "react-native";
import { sysContext } from "../components/wrappers/wProviderWrapper"


export enum Theme{
    default,
    lime
}
export enum colorScheme{
    ColorA,
    ColorB,
    ColorC,
    ColorD,
    ColorE,
    ColorF
}

export function GetColor(type:colorScheme){
    const t:Theme =1;
    switch(t){
        case Theme.default:{
            switch(type){
                case colorScheme.ColorA:{ return  `#000108` }
                case colorScheme.ColorB:{ return  `#333138` }
                case colorScheme.ColorC:{ return  `#515052` }
                case colorScheme.ColorD:{ return  `#cc312E` }
                case colorScheme.ColorE:{ return  `#FFFFFa` }
                case colorScheme.ColorF:{ return  `#2EC9CC` }
                default:                { return  `#cc312E` }
            }
        }
        case Theme.lime:{
            switch(type){
                case colorScheme.ColorA:{ return  `#1B4079` }
                case colorScheme.ColorB:{ return  `#4D7C8A` }
                case colorScheme.ColorC:{ return  `#7F9C96` }
                case colorScheme.ColorD:{ return  `#8FAD88` }
                case colorScheme.ColorE:{ return  `#CBDF90` }
                case colorScheme.ColorF:{ return  `#FFFFFF` }
                default:                { return  `#882255` }
            }
        }
    }
}


//==========================================
export enum textType{
    PageTitle,
    HeaderSection,
    GeneralText,
    InputText
}
export function TextStyle(type:textType){
    switch(type){
        case textType.PageTitle:            {return { fontSize:100, color:GetColor(colorScheme.ColorE),    italic: {fontStyle: 'italic'},fontFamily:"notoserif"} }
        case textType.HeaderSection:        {return { fontSize:40, color:GetColor(colorScheme.ColorE) } }
        case textType.GeneralText:          {return { fontSize:30, color:GetColor(colorScheme.ColorE)} }
        case textType.InputText:            {return { fontSize:30, color:GetColor(colorScheme.ColorE) } }
        default:                            {return { fontSize:70, color:GetColor(colorScheme.ColorE) } }
    }
}
//==========================================
export enum buttonType{
    normal,
    exist,
    adminStyle,
    inputField
}
export function ButtonColor(type: buttonType){
    switch(type){
        case buttonType.normal:         { return GetColor(colorScheme.ColorD)}
        case buttonType.exist:         { return GetColor(colorScheme.ColorD)}
        case buttonType.adminStyle:         { return GetColor(colorScheme.ColorF)}
        case buttonType.inputField:         { return GetColor(colorScheme.ColorC)}
        default:                        { return GetColor(colorScheme.ColorD)}
    }

}
//==========================================
export enum InputTextType{
    normal
}
export function InputTextComponentStyle(type:InputTextType){
    switch(type){
        case InputTextType.normal:    { return { height: 35, margin: 2, borderWidth: 2, fontSize:30, color:GetColor(colorScheme.ColorE) ,borderColor:GetColor(colorScheme.ColorD)}}
    }
}
//==========================================
export function iTSB(type:InputTextType){
    switch(type){
        case InputTextType.normal:  {return {backgroundColor:GetColor(colorScheme.ColorC)}}
        default:                    {return {backgroundColor:GetColor(colorScheme.ColorC)}}
    }
}
export function HorizontalLineStyle(){
    return { borderBottomColor: GetColor(colorScheme.ColorE), borderBottomWidth: 3, padding:10 }
}

export function getDevViewStyle(){
    const FoundContext = React.useContext(sysContext)
    if(FoundContext.dev){
        const a= 1+ Math.floor(Math.random()*8);
        const b=1+ Math.floor(Math.random()*8);
        const c=1+ Math.floor(Math.random()*8);
        return {backgroundColor:`#0${a}0${b}0${c}`}
    }
    else{return {}}
}


export function ScrollViewStyle(){
    return {backgroundColor: GetColor(colorScheme.ColorB), marginHorizontal: 20}
}


export function ModalStyle(){
    return StyleSheet.create( {modalView:{
        flex:3,
        marginTop: 22,
        marginBottom: 15,
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }})
}