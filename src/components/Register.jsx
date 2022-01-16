import { useState } from "react";
// import * as style from "../components/CSS/login&register.module.css"
import "./login&register.module.css";
import { HashLoader } from "react-spinners";

const Register = ({ newLogin }) => {
  const [email, setemail] = useState("");
  const [password1, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [spiner, setSpiner] = useState(false);

  let password = "";

  const handelSubmit = (e) => {
    e.preventDefault();
    seterror(false);
    setSpiner(true);
    if (password1 === password && password) {
      registerFetchPostReq();
      seterror(false);
    } else {
      console.log("Password Does Not match");
      setTimeout(()=>{
        setSpiner(false);
        setpassword("");
        password = "";
        seterror(true);
      },2000)
    }
  };
  
  const registerFetchPostReq = () => {
    const API_KEY = "AIzaSyDT97yQpiS2jM35imVEkWTLN1yQ7y7S70U";
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
      )
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          if (data.error) {
            setSpiner(false);
            seterror(true);
            setpassword("");
            password = "";
          } else {
            localStorage.setItem("auth", JSON.stringify(data));
            newLogin();
          }
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        seterror(true);
      });
  };

  return (
    <div className="center">
      <h1>Register </h1>
      <form onSubmit={handelSubmit}>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          id="email"
          onChange={(e) => setemail(e.target.value)}
        />
        <br />
        <label htmlFor="passwrod1">Passwrod:</label>
        <br />
        <input
          type="password"
          id="password1"
          onChange={(e) => setpassword(e.target.value)}
          autoComplete="on"
        />
        <br />
        <label htmlFor="password2">Confirm Password:</label>
        <br />
        <input
          type="password"
          id="password2"
          onChange={(e) => (password = e.target.value)}
          autoComplete="on"
        />
        <br />
        <br />
        {spiner ? (
          <HashLoader color="red" />
        ) : (
          <button type="submit">Register</button>
        )}
        {error ? (
          // <p className={style.errorRegister}>Please check your Email and Password.</p>
          <p>Error, something went worng, please try again.</p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};
export default Register;
