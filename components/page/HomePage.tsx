import { useState } from "react";
import NavigationBar from "../element/eNavigationBar";
import UserProfile from "../panels/homepage/pUserProfile";
import RequestView from "../panels/homepage/pRequestView";
import RequestCreation from "../panels/homepage/pRequestCreation";
import DisplayRecords from "../panels/homepage/pDisplayRecords";
import { View,Text, Button } from "react-native";
import { HorizontalLine, StyleText } from "../../BasicComponents/BasicComponent";
import { textType } from "../../BasicComponents/StyleSheet";
import AdminPage from "../adminTools/AdminPage";


export default function HomePage(){
    const [pageTitle, setPageTitle] = useState('Your Profile');
    const [ActiveTab, setActiveTab] = useState(0)

    

    function change(index:number){
        setActiveTab(index)
        switch(index){
            case 0:     { setPageTitle('Your Profile')      ;break}
            case 1:     { setPageTitle('Your Request')      ;break}
            case 2:     { setPageTitle('Make a request')    ;break}
            case 3:     { setPageTitle('Manage Request')    ;break}
            case 4:     { setPageTitle('Statistics')        ;break}
            case 5:     { setPageTitle('Admin Tools')       ;break}
            default:    { setPageTitle('Your Profile')      ;break}
        }
    }

    function switchActiveTable(){
        switch(ActiveTab){
            case 0:     { return ( <UserProfile/>  ) }
            case 1:     { return ( <RequestView ManagerMode = { false}/>)}
            case 2:     { return ( <RequestCreation/> ) }
            case 3:     { return ( <RequestView ManagerMode = { true }/> ) }
            case 4:     { return ( <DisplayRecords/> ) }
            case 5:     { return ( <AdminPage/>) }
            default:    { return ( <UserProfile/>  )  }
        }
    }

    return(<>
    <View style={[ {   flexDirection: "column", justifyContent:"center", alignContent:"center"  }]}>
        <View style={{padding:50,justifyContent:"center",alignContent:"center"}}> 
            { StyleText(pageTitle,textType.PageTitle) }
        </View>
        <NavigationBar setFunc={ change }/>
        {HorizontalLine()}

        {switchActiveTable()}

        {HorizontalLine()}
    </View>
    </>)
}