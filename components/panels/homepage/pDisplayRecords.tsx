import React, { useEffect, useState } from "react"
import { ScrollView, StatusBar, View } from "react-native"
import { StyleText } from "../../../BasicComponents/BasicComponent"
import { TransferRecords } from "../../../Project1-GitUtil-Reimbursement/Types/dto"
import { sysContext } from "../../wrappers/wProviderWrapper"


export default function DisplayRecords(){
    const FoundContext = React.useContext(sysContext)
    const [EntryDisplay, setEntry] = useState([<></>])

    async function DisplayRecords(){
        const Result:TransferRecords = await FoundContext.HTTPHandler.ManagerGetRecords()
        setEntry( Result.ReturnRecords.map((   (e)=><View> {StyleText(e)}  </View> ) )   )
    }

    useEffect(() => {
        DisplayRecords()

        return () => {};}, []);

    return(
    <View>
        <ScrollView style={styles.scrollView}>
          {EntryDisplay} 
        </ScrollView>
    </View>)
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