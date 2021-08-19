import React, { useRef, useState } from "react";
import axios from "axios";
// import { SignUpModal } from "../Modal/registerModal";
import LoginModal from "../Modal/loginModal";
import "./formRegister.css";
import { Route } from "react-router-dom";
import FormLogin from "./formLogin";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userControlPassword, setUserControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const userEmailError = document.querySelector(".userEmail.error");
    const userNameError = document.querySelector(".userName.error");
    const userLastNameError = document.querySelector(".userLastName.error");
    const userPasswordError = document.querySelector(".userPassword.error");
    const userControlPasswordError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    userControlPasswordError.innerHTML = "";
    termsError.innerHTML = "";

    if (userPassword !== userControlPassword || !terms.checked) {
      if (userPassword !== userControlPassword)
        userControlPasswordError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          userEmail,
          userName,
          userLastName,
          userPassword,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            userEmailError.innerHTML = res.data.errors.userEmail;
            userNameError.innerHTML = res.data.errors.userName;
            userLastNameError.innerHTML = res.data.errors.userLastName;
            userPasswordError.innerHTML = res.data.errors.userPassword;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {formSubmit ? (
        <div className="loginReginter">
          <FormLogin />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
          <div></div>
        </div>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <div className="logo">
            <img className="im" src="/img/wecoepiLogo.png" alt="logo wecoepi" />
          </div>
          <input
            placeholder="email"
            type="email"
            name="userEmail"
            id="userEmail"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
          />
          <div className="userEmail error"></div>

          <input
            placeholder="nom"
            type="text"
            name="userName"
            id="userName"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <div className="userName error"></div>

          <input
            placeholder="prénom"
            type="text"
            name="userLastName"
            id="userLastName"
            onChange={(e) => setUserLastName(e.target.value)}
            value={userLastName}
          />
          <div className="userLastName error"></div>

          <input
            placeholder="mot de passe"
            type="password"
            name="userPassword"
            id="userPassword"
            onChange={(e) => setUserPassword(e.target.value)}
            value={userPassword}
          />
          <div className="userPassword error"></div>

          <input
            placeholder="confire mot de passe"
            type="password"
            name="userControlPassword"
            title="confirm password"
            id="userControlPassword"
            onChange={(e) => setUserControlPassword(e.target.value)}
            value={userControlPassword}
          />
          <div className="password-confirm error"></div>
          <input className="check" type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>

          <button type="submit">S'inscrire</button>
        </form>
      )}
    </div>
  );
};

export default SignUpForm;
