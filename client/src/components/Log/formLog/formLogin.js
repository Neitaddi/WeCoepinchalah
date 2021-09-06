import React, { useState } from "react";
import axios from "axios";
import "./formLogin.css";
export default function FormLogin() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".userEmail.error");
    const passwordError = document.querySelector(".userPassword.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        userEmail,
        userPassword,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.userEmail;
          passwordError.innerHTML = res.data.errors.userPassword;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="form-content-right">
        <form action="" onSubmit={handleLogin} id="sign-up-form">
          <div className="logo">
            <img className="im" src="/img/wecoepiLogo.png" alt="logo wecoepi" />
          </div>
          <input
            className="inputLogin"
            placeholder="email"
            type="text"
            name="userEmail"
            id="userEmail"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
          />
          <div className="userEmail error"></div>

          <input
            className="inputLogin"
            placeholder="mot de passe"
            type="password"
            name="userPassword"
            // placeholder="**********"
            id="userPassword"
            onChange={(e) => setUserPassword(e.target.value)}
            value={userPassword}
          />
          <div className="userPassword error"></div>

          <button className="btn" type="submit">
            Connexion
          </button>
        </form>
      </div>
    </>
  );
}
