import { useEffect, useState } from "react"
import LoginAndRegister from "./LoginAndRegister"
import style from "./CSS/modal.module.css"


const Modal = ({newLogin})=>{
    const [modal, setmodal] = useState(false)
    useEffect(()=>{
        console.log("didMount");
        return ()=>console.log("component stop")},[]
    )
    
    return ( 
        modal?
        
        <div className={style.afterClicking}>
          <img className={style.centerX} onClick={()=>setmodal(!modal)}
          src="https://img.icons8.com/color/48/000000/delete-sign--v2.png" alt="close"/>
          <br/>
          <LoginAndRegister newLogin={newLogin}/>

        </div>
        :
          <button className={style.loginAndRegister} onClick={()=>setmodal(true)}>Login / Register</button>
        )
}
export default Modal