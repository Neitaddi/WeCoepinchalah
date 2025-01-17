import axios from "axios";
import React, { useState } from "react";
import { BsChevronRight, BsChevronLeft, BsInfoCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addClub } from "../../../js/actions/clubActions";
import "./formRegisterModalClub.css";

const FormRegisterModelClub = () => {
  // ('posterId', userData._id);
  const userData = useSelector((state) => state.userReducer);

  const [clubName, setClubName] = useState("");
  const [clubCategorie, setClubCategorie] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubLocatioun, setClubLocatioun] = useState("");
  const [clubPhone, setClubPhone] = useState("");
  const [clubEmail, setClubEmail] = useState("");
  const [clubWebSite, setClubWebSite] = useState("");
  const dispatch = useDispatch();

  const handleCreteClub = async (e) => {
    e.preventDefault();

    dispatch(
      addClub(
        userData._id,
        clubName,
        clubCategorie,
        clubDescription,
        clubLocatioun,
        clubPhone,
        clubEmail,
        clubWebSite
      )
    );
  };

  return (
    <div className="container">
      <div className="from-outer">
        <form className="form" action="#">
          <input
            className="inp"
            type="radio"
            name="tab-btn"
            id="form-btn-2"
            value=""
          />
          <label for="form-btn-1">
            <BsChevronLeft className="rightbt returnBtn" />
          </label>
          <input
            type="radio"
            className="inp"
            name="tab-btn"
            id="form-btn-1"
            value=""
            checked
          />
          <label for="form-btn-2">
            <BsChevronRight className="leftbt nextBtn" />{" "}
          </label>

          <div className="page1 " id="pageform-1">
            <img
              className="logo"
              src="/img/wecoepiLogo.png"
              alt="logo wecoepi"
            />
            {/* first page */}
            <div className="page">
              <div className="title">
                Créer un Club <BsInfoCircle />
              </div>
              {/* className="leftbt nextBtn" */}

              {/* <button className="leftbt nextBtn">
                <BsChevronRight />
              </button> */}

              <div className="inputT">
                <div className="label">Infomation sur le Club</div>
                <input
                  className="inputClub"
                  id="inputClub"
                  type="text"
                  placeholder="Nom du Club (Obligatoire)"
                  onChange={(e) => setClubName(e.target.value)}
                  value={clubName}
                />
                <input
                  className="inputClub"
                  id="inputClub"
                  type="text"
                  placeholder="Catégorie (Obligatoire)"
                  onChange={(e) => setClubCategorie(e.target.value)}
                  value={clubCategorie}
                />
                <div className="soustext">
                  Choisissez une catégorie qui décrit le type de Club.
                </div>
                {/* rows="5" cols="33" */}
                <textarea
                  className="textAria"
                  placeholder="Description (Obligatoire)"
                  id="desc"
                  name="desc"
                  rows="5"
                  cols="33"
                  onChange={(e) => setClubDescription(e.target.value)}
                  value={clubDescription}
                />
                <div className="soustext">
                  Décrivez ce que fait votre Club et leur objectif . <br />{" "}
                  Limite de caractères : 255
                </div>
              </div>
            </div>
            <div className="progress-bar">
              <div className="step">
                <div className="bullet">
                  <span>1</span>
                </div>
                <div className="check fas fa-check"></div>
              </div>
              <div className="step">
                <div className="bullet2">
                  <span>2</span>
                </div>
                <div className="check fas fa-check"></div>
              </div>
            </div>
          </div>
          {/* seconde page */}
          <div className="page1" id="pageform-2">
            <img
              className="logo"
              src="/img/wecoepiLogo.png"
              alt="logo wecoepi"
            />
            <button className="btnCreateClub" onClick={handleCreteClub}>
              Crée un Club
            </button>

            <div className="page">
              <div className="inputT" id="inp2">
                <div className="label">Localisation</div>
                <select
                  className="selectG"
                  id="desc"
                  onChange={(e) => setClubLocatioun(e.target.value)}
                  value={clubLocatioun}
                >
                  <option value="" selected disabled hidden id="firstOp">
                    Gouvernerat (Obligatoire)
                  </option>
                  <option> Ariana </option>
                  <option> Béja </option>
                  <option> Ben Arous</option>
                  <option> Bizerte</option>
                  <option> Gabès</option>
                  <option> Gafsa</option>
                  <option> Jendouba</option>
                  <option> Kairouan</option>
                  <option> Kasserine</option>
                  <option> Kébili</option>
                  <option> Kef</option>
                  <option> Mahdia</option>
                  <option> Manouba</option>
                  <option> Médenine</option>
                  <option> Monastir</option>
                  <option> Nabeul</option>
                  <option> Sfax</option>
                  <option> Sidi Bouzid</option>
                  <option> Siliana</option>
                  <option> Sousse</option>
                  <option> Tataouine</option>
                  <option> Tozeur</option>
                  <option> Tunis</option>
                  <option> Zaghouan</option>
                </select>
                <div className="label">Contact</div>
                <input
                  className="inputClub"
                  id="inputClub"
                  placeholder="Numéro de téléphone (Obligatoire)"
                  type="text"
                  onChange={(e) => setClubPhone(e.target.value)}
                  value={clubPhone}
                />
                <input
                  className="inputClub"
                  id="inputClub"
                  placeholder="Adresse e-mail (Obligatoire)"
                  type="text"
                  onChange={(e) => setClubEmail(e.target.value)}
                  value={clubEmail}
                />
                <input
                  className="inputClub"
                  id="inputClub"
                  placeholder="Site web (Optionél)"
                  type="text"
                  onChange={(e) => setClubWebSite(e.target.value)}
                  value={clubWebSite}
                />
              </div>
            </div>
            <div className="progress-bar" id="progress2">
              <div className="step">
                <div className="bullet0">
                  <span>1</span>
                </div>
                <div className="check fas fa-check"></div>
              </div>
              <div className="step">
                <div className="bullet1">
                  <span>2</span>
                </div>
                <div className="check fas fa-check"></div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormRegisterModelClub;
