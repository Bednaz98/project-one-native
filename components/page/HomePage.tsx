import { useState } from "react";
import NavigationBar from "../element/eNavigationBar";
import UserProfile from "../panels/homepage/pUserProfile";
import RequestView from "../panels/homepage/pRequestView";
import RequestCreation from "../panels/homepage/pRequestCreation";
import DisplayRecords from "../panels/homepage/pDisplayRecords";
import { View,Text } from "react-native";


export default function HomePage(){
    const [ActiveTab, setActiveTab] = useState(0)
    function switchActiveTable(){
        switch(ActiveTab){
            case 0:     {return ( <UserProfile/>  )  }
            case 1:     {return ( <RequestView ManagerMode= {false}/> )  }
            case 2:     {return ( <RequestCreation/>  )  }
            case 3:     {return ( <RequestView ManagerMode= {true}/>  )  }
            case 4:     {return ( <DisplayRecords/> )  }
            default:    {return (  <UserProfile/> )   }
        }
    }
    return(<>
    <View>
        <Text> Home Page </Text>
        <NavigationBar switchTab={setActiveTab}/>
        {/*switchActiveTable()*/}
    </View>
    </>)
}