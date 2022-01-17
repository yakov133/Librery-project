import { useState } from "react";
import { HashLoader } from "react-spinners";
import style from "./CSS/modal.module.css"
const Login = ({ newLogin }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [spiner, setSpiner] = useState(false);
  document.body.backgroundColor = "orange"
  const handelSubmit = (e) => {
    setSpiner(true);
    e.preventDefault();
    LoginFetchPostReq();
  };

  const LoginFetchPostReq = () => {
    const API_KEY = "AIzaSyDT97yQpiS2jM35imVEkWTLN1yQ7y7S70U";
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
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
          } else {
            localStorage.setItem("auth", JSON.stringify(data));
            newLogin();
            
          }
        }, 2000);
      })
      .catch((err) => {
        setTimeout(() => {
          console.error(err);
          setSpiner(false);
          seterror(true);
        }, 2000);
      });
  };

  return (
    <div className={style.centerAll}>
      <h1>Sign In </h1>
      <form onSubmit={handelSubmit}>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          id="email"
          onChange={(e) => setemail(e.target.value)}
          autoComplete="on"
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          id="password"
          onChange={(e) => setpassword(e.target.value)}
          autoComplete="on"
        />
        <br />
        <br />
        {spiner ? (
          <HashLoader color="red" />
        ) : (
          <button type="submit">Login</button>
        )}
        {error ? <p>Error something went worng please try again.</p> : ""}
      </form>
    </div>
  );
};
export default Login;
