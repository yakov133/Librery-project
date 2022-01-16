import { useEffect, useState } from "react"
import LoginAndRegister from "./LoginAndRegister"


const Modal = ({newLogin})=>{
    const [modal, setmodal] = useState(false)
    useEffect(()=>{
        console.log("didMount");
        return ()=>console.log("component stop")},[]
    )
    
    return ( 
        modal?
        <div>
          <img onClick={()=>setmodal(!modal)}
          src="https://img.icons8.com/color/48/000000/delete-sign--v2.png" alt="close"/>
          <br/>
          <LoginAndRegister newLogin={newLogin}/>

        </div>
        :
          <button onClick={()=>setmodal(true)}>Login / Register</button>
        )
}
export default Modal