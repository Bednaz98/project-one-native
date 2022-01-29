import { Request } from "../../Project1-GitUtil-Reimbursement/Types/Entity";
import { RequestStatus } from "../../Project1-GitUtil-Reimbursement/Types/Enums";
import {v4} from 'uuid';
import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleProp, View, ViewStyle } from "react-native";
import { StyleButton, StyleInputText, StyleModal, StyleText } from "../../BasicComponents/BasicComponent";
import { buttonType, textType } from "../../BasicComponents/StyleSheet";
import { sysContext } from "../wrappers/wProviderWrapper";
import DataProcessor from "../../Project1-GitUtil-Reimbursement/Classes/DataProcessor";


export default function RequestSelectButton(props){
    const FoundContext = React.useContext(sysContext)

    // Initialization vars=============================
    const NullRequest:Request = {Amount: 0, RequestStatus:0,PostDate: 0}
    const Type: RequestStatus = RequestStatus.All
    //=================================================
    const proc:DataProcessor = new DataProcessor()
    const InputRequest:Request = props.InputRequest
    const ID:string = proc.ExtractRequestIDs(InputRequest.id)[1]
    const setSetRequest:Function = props.setSetRequest
    const DisplayRequestButtons:Function = props.DisplayRequestButtons
    const ManagerMode:boolean = ( true===  props.ManagerMode);
    const [modalVisible, setModalVisible] = useState(false);
    const [sendMessage, setSendMessage] = useState('');
    const [displayName, setDisplayName] = useState('');

    async function GetName(){
        try {
            const Result = await FoundContext.HTTPHandler.GetManagerName(ID);
            setDisplayName(Result.ReturnString)
        } catch (error) {
            setDisplayName('')
        }
    }
    
    useEffect(() => {
        GetName()
        return () => {};},[]);
    


    function ConvertPostedDate():string{
        const Display = (new Date(InputRequest?.PostDate)).toLocaleDateString()
        return Display;
    }
    function ConvertModDate():string{
        const Display = (new Date(InputRequest?.ModifiedDate)).toLocaleDateString()
        return Display;
    }
    function grabStatus(){
        return RequestStatus[InputRequest?.RequestStatus] ?? 'null';
    }

    async function AcceptRequest(){
        const Result = await FoundContext.HTTPHandler.ManagerChangeRequest(FoundContext.readUserProfile.id, InputRequest.id,RequestStatus.Approved,sendMessage)
        if(Result?.ReturnRequest){
            setSetRequest({...Result.ReturnRequest})
            DisplayRequestButtons()
            setSendMessage('')
            setModalVisible(false)

        }
    }
    async function DenyRequest(){
        const Result = await FoundContext.HTTPHandler.ManagerChangeRequest(FoundContext.readUserProfile.id, InputRequest.id,RequestStatus.Denied,sendMessage)
        if(Result?.ReturnRequest){
            setSetRequest({...Result.ReturnRequest})
            DisplayRequestButtons()
            setSendMessage('')
            setModalVisible(false)
        }
    }
    async function DeleteRequest(){
        const Result = await FoundContext.HTTPHandler.DeleteRequest(FoundContext.readUserProfile.id, InputRequest.id)
        if(Result.ResultCheck){
            DisplayRequestButtons()
            setSendMessage('')
            setModalVisible(false)
        }
    }

    function displayButtonOptions(){
        if(ManagerMode){
            if(InputRequest?.RequestStatus == RequestStatus.Pending){ return ( 
                <View style={{flexDirection: 'column'}}>
                    <View> {StyleInputText(setSendMessage,'Message: ',sendMessage )}  </View>
                    <View style={{flexDirection: 'row'}} > 
                        <View> {StyleButton(()=>DenyRequest(), 'Deny')} </View>
                        <View> {StyleButton(()=>AcceptRequest(), 'Approve')} </View>
                    <View> </View>
                </View>

                </View>
                )}
            return (<></>)
        }
        else{
            if(InputRequest?.RequestStatus == RequestStatus.Pending){return (
                <View>
                    <View> {StyleButton(()=>DeleteRequest(), 'Delete')} </View>
                </View>
            )}
            return (<></>)
        }
    }

    function GetInnerModal(){
        return(
        <View >
            <View> {StyleText('Reimbursement', textType.HeaderSection)}  </View>
            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
                <View> {StyleText('Post Date') } </View> <View> {StyleText(ConvertPostedDate()) } </View>
                <View> {StyleText('Modified date') } </View> <View> {StyleText(ConvertModDate()) } </View>
            </View>
            <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center', backgroundColor:'#2233aa'}}>
                <View style ={{padding:5}} > {StyleText('Amount: ') } </View> <View style ={{padding:5}} > {StyleText('500') } </View>
                <View style ={{padding:5}} > {StyleText('Status: ') } </View> <View style ={{padding:5}} > {StyleText(grabStatus()) } </View>
            </View>
            <View style={{flexDirection: 'row'}}>  {StyleText('Request Reason: ')}  {StyleText(InputRequest.InputMessage)} </View>
            <View style={{flexDirection: 'row'}}>  {StyleText('Manager Response: ')}  {StyleText(InputRequest.ManagerMessage)} </View>
            <View >{  displayButtonOptions()  }</View>
            <View style={{padding:10}} >{StyleButton(()=> setModalVisible(false), ' X ', buttonType.exist )}</View>
        </View>)
    }

    return (
        <>
            {StyleModal(modalVisible, setModalVisible, GetInnerModal())}
            {StyleButton(()=> setModalVisible(true),`${displayName} ${ConvertPostedDate()}: $${ InputRequest.Amount}, ${grabStatus()}` )}
        </>)
}
