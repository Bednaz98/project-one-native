import { StatusBar } from "react-native"

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
        case textType.PageTitle:        {return { fontSize:100, color:"floralwhite" } }
        case textType.HeaderSection:        {return { fontSize:40, color:"floralwhite" } }
        case textType.GeneralText:          {return { fontSize:30, color:"floralwhite" } }
        case textType.InputText:            {return { fontSize:30, color:"floralwhite" } }
        default:                            {return { fontSize:70, color:"floralwhite" } }
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
        case buttonType.normal:         { return `#2196F3`}
        case buttonType.exist:         { return `#FF0000`}
        case buttonType.adminStyle:         { return `#FFaa22`}
        case buttonType.inputField:         { return `#222222`}
        default:                        { return `#2196F3`}
    }

}
//==========================================
export enum InputTextType{
    normal
}
export function InputTextComponentStyle(type:InputTextType){
    switch(type){
        case InputTextType.normal:      { return { height: 35, margin: 2, borderWidth: 1, fontSize:30, color:"floralwhite" }}
    }
}
//==========================================
export function iTSB(type:InputTextType){
    switch(type){
        case InputTextType.normal:  {return {backgroundColor:"#333333"}}
        default:                    {return {backgroundColor:"#333333"}}
    }
}


