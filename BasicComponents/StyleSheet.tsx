import React from "react"
import { StyleSheet} from "react-native";
import { sysContext } from "../components/wrappers/wProviderWrapper"


export enum colorScheme{
    ColorA,
    ColorB,
    ColorC,
    ColorD,
    ColorE,
    ColorF
}

export function GetColor(type:colorScheme){
    const t:theme =0;
    switch(t){
        case theme.default:{
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
        case theme.light:{
            switch(type){
                case colorScheme.ColorA:{ return  `#553377` }
                case colorScheme.ColorB:{ return  `#882275` }
                case colorScheme.ColorC:{ return  `#996633` }
                case colorScheme.ColorD:{ return  `#445566` }
                case colorScheme.ColorE:{ return  `#227337` }
                case colorScheme.ColorF:{ return  `#993366` }
                default:                { return  `#882255` }
            }
        }
    }
}



export enum theme{
    default,
    light
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
        margin: 20,
        backgroundColor: GetColor(colorScheme.ColorB),
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
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