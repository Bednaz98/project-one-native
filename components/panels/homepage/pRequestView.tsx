import React from "react"
import { useEffect, useState } from "react"
import { Request } from "../../../Project1-GitUtil-Reimbursement/Types/Entity"
import { RequestStatus } from "../../../Project1-GitUtil-Reimbursement/Types/Enums"
import RequestSelectButton from "../../element/eRequestSelectButton"
import { sysContext } from "../../wrappers/wProviderWrapper"
import {v4} from 'uuid';
import { StyleButton, StyleText } from "../../../BasicComponents/BasicComponent"
import { textType } from "../../../BasicComponents/StyleSheet"
import { FlatList, ScrollView, StatusBar, View } from "react-native"


export default function RequestView(props){
    const ManagerMode:boolean = props.ManagerMode
    const FoundContext = React.useContext(sysContext)

    // Initialization vars=============================
    const NullRequest:Request = {Amount: 0, RequestStatus:0,PostDate: 0}
    const Type: RequestStatus = RequestStatus.All
    //=================================================
    const [RequestID, setSetRequest] = useState(NullRequest)
    const [RequestType, setRequestType] = useState(Type)
    const [ButtonDisplay, setButtonDisplay] = useState([<></>])


    useEffect(() => {
        setButtonDisplay([<></>])
        DisplayRequestButtons();

        return () => {}}, []);


    async function DisplayRequestButtons(){
        if(ManagerMode){
            const transferArray = await FoundContext.HTTPHandler.GetAllSentRequestOfType(FoundContext.readUserProfile.id,RequestType )
            console.log(transferArray)
            if(! (transferArray.ReturnRequestArray.length >0) ) { 
                setButtonDisplay([ StyleText('No Request Found') ] )
                return;
            } 
            setButtonDisplay(   transferArray.ReturnRequestArray.map( (e)=> <tr><RequestSelectButton key = {v4()} InputRequest ={e} setSetRequest={setSetRequest} ManagerMode={ManagerMode}/></tr>) )
            
        }
        else{
            const transferArray = await FoundContext.HTTPHandler.ManagerGetAllRequest(FoundContext.readUserProfile.id)
            console.log(transferArray)
            if(! (transferArray.ReturnRequestArray.length >0) ) { 
                setButtonDisplay([<h4> No request found </h4>] )
                return;
            } 
            setButtonDisplay(   transferArray.ReturnRequestArray.map( (e)=> <tr><RequestSelectButton key = {v4()} InputRequest ={e} setSetRequest={setSetRequest} DisplayRequestButtons={DisplayRequestButtons}/></tr>) )

        }
        
    }

    return( <>
        <View style = {{padding:20}}> {StyleButton( ()=> {setButtonDisplay([<></>]); DisplayRequestButtons();} , 'Refresh') } </View>
        <View style={[ {   flexDirection: "column"  }]} >
            <ScrollView style={styles.scrollView}>
                {ButtonDisplay} 
            </ScrollView>
        </View>
        
    </>)
}


const styles = ({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      backgroundColor: '#222222',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
  });