import { useReducer } from "react"
import CreateProfileScreen from "../panels/signin/pCreateProfileScreen"
import LoginScreen from "../panels/signin/pLoginScreen"

function reducer(State:boolean,action:any){ return !(State); }
const initState:boolean = false;

export default function SignInSwitcher(){
    const [isCreateScreen, dispatchCreateScreen] = useReducer(reducer, initState)
    function SignInView(){
        if(isCreateScreen){return <CreateProfileScreen dispatch={dispatchCreateScreen}/>}
        else {return <LoginScreen dispatch={dispatchCreateScreen}/>}
    }
    return (<>
        {SignInView()}
        </>)
}