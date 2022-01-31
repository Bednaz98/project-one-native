import React from "react"
import { useEffect, useState } from "react"
import { Request } from "../../../Project1-GitUtil-Reimbursement/Types/Entity"
import { RequestStatus } from "../../../Project1-GitUtil-Reimbursement/Types/Enums"
import RequestSelectButton from "../../element/eRequestSelectButton"
import { sysContext } from "../../wrappers/wProviderWrapper"
import {v4} from 'uuid';
import { StyleButton, StyleScrollView, StyleText } from "../../../BasicComponents/BasicComponent"
import { textType } from "../../../BasicComponents/StyleSheet"
import {ScrollView, StatusBar, View } from "react-native"
import { ResultReturnCheck, TransferRequestArray } from "../../../Project1-GitUtil-Reimbursement/Types/dto"



export default function RequestView(props){
    const mode:boolean = props.ManagerMode
    const FoundContext = React.useContext(sysContext)

    // Initialization vars=============================
    const NullRequest:Request = {Amount: 0, RequestStatus:0,PostDate: 0}
    //=================================================
    const [RequestID, setSetRequest] = useState(NullRequest)
    const [RequestType, setRequestType] = useState(RequestStatus.Pending)
    const [ButtonDisplay, setButtonDisplay] = useState([<></>])
    const [isAdmin, AdminAccess] = useState(false)



    useEffect(() => {
        FilterSearch(RequestType);
        if(mode){checkAdmin()}
        return () => {}}, []);

    async function checkAdmin(){
        try {
            const Result:ResultReturnCheck = await FoundContext.HTTPHandler.CheckAdminPermissions()
            AdminAccess(Result.ResultCheck)
        } catch (error) {
            AdminAccess(false)
        }
    }
    async function DisplayRequestButtons(type:RequestStatus){
        if(mode){
            console.log('ManagerMode')
            let transferArray:TransferRequestArray;
            try {
                console.log('manager refresh')
                transferArray = await FoundContext.HTTPHandler.ManagerGetAllRequest(FoundContext.readUserProfile.id,type)
                console.log('no error')
                if(! (transferArray.ReturnRequestArray.length >0) ) { 
                    setButtonDisplay([ StyleText('No Request Found') ] );return;
                } 
                else{
                    setButtonDisplay(   transferArray.ReturnRequestArray.map( (e)=> <RequestSelectButton key = {v4()} InputRequest ={e} setSetRequest={setSetRequest} ManagerMode={mode} DisplayRequestButtons={FilterSearch}/>) )
                }
            } catch (error) {
                setButtonDisplay([ StyleText('No Request Found') ] );return;
            }
        }
        else{
            console.log('general fetch')
            let transferArray:TransferRequestArray;
            try {
                console.log('general refresh')
                transferArray = await FoundContext.HTTPHandler.GetAllSentRequestOfType(FoundContext.readUserProfile.id, type)
            } catch (error) {
                setButtonDisplay([StyleText('No Request Found')] );return;
            }
            if(! (transferArray.ReturnRequestArray.length >0) ) { 
                setButtonDisplay([StyleText('No Request Found')] )
                return;
            } 
            setButtonDisplay(   transferArray.ReturnRequestArray.map( (e)=> <RequestSelectButton key = {v4()} InputRequest ={e} setSetRequest={setSetRequest} ManagerMode={mode}  DisplayRequestButtons={FilterSearch}/>) )
        }
        
    }


    function FilterSearch(type:RequestStatus){
        setRequestType(type);
        DisplayRequestButtons(type)
    }

    function displayAdminButton(){
        if(isAdmin){ return( <View style={{flex:1}}> {StyleButton( ()=> FilterSearch(RequestStatus.deleted) ,'Deleted')} </View>  ) } }

    return(
    <View style={{flexDirection:"column", justifyContent:"center"}}>
        <View style={{flexDirection:"row"}}> 
            <View style={{flex:1}}/>
            <View style={{flex:5, alignItems:"center",justifyContent:"center"}}> {StyleText(`Filter: ${RequestStatus[RequestType]}`, textType.HeaderSection)} </View>
            <View style={{flex:1}}/>
        </View>
        <View style={ { flexDirection: "row" }}>  
            <View style={{flex:1}}/>
            <View style={{flex:1}}> {StyleButton(()=>FilterSearch(RequestStatus.All) ,'All')} </View>
            <View style={{flex:1}}> {StyleButton(()=>FilterSearch(RequestStatus.Pending) ,'Pending')} </View>
            <View style={{flex:1}}> {StyleButton(()=>FilterSearch(RequestStatus.Denied) ,'Denied')} </View>
            <View style={{flex:1}}> {StyleButton(()=>FilterSearch(RequestStatus.Approved) ,'Approved')}</View>
            {displayAdminButton()}
            <View style={{flex:1}}/>
        </View>
        <View style={{flexDirection:"row"}}>
            <View style={{flex:1}}/>
            <View style={{flex:6}}> {StyleButton( ()=> {()=>DisplayRequestButtons(RequestType);} , 'Refresh') }  </View>
            <View style={{flex:1}}/>
        </View>
        <View style={{padding:10}}>
            <StyleScrollView>
                {ButtonDisplay}
            </StyleScrollView>
        </View>
    </View>)
}
