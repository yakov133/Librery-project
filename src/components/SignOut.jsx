import { FaSignOutAlt } from "react-icons/fa";
import style from './CSS/singOut.module.css'
const SignOut = ({exit, setuserIsLogedIn,setbookslist,setreadinglist,setcompletedlist,setdetails }) => {

  return (
    <div>
      <button className={style.btn} onClick={()=>exit()}><FaSignOutAlt/></button>
    </div>
  );
};
export default SignOut;
