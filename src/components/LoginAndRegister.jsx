import { useState } from "react";
import Login from "./Login";
import Register from "./Register";


const LoginAndRegister = ({newLogin ,isUserlogedIn})=>{
    const [state, setstate] = useState(true)


    return(
        <div className="bordring">
            {state?<Login newLogin={newLogin}/>:<Register newLogin={newLogin}/>}
            <br />
            {state?
            <a  onClick={()=>setstate(!state)}>Need To Register?</a>
            :
            <a onClick={()=>setstate(!state)}>Already A Member?</a>
        }
        </div>
        )
}
export default LoginAndRegister;