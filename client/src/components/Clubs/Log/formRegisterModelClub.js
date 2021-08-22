import React from "react";
import { BsChevronRight, BsChevronLeft, BsInfoCircle } from "react-icons/bs";
import "./formRegisterModalClub.css";

const FormRegisterModelClub = () => {
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
                />
                <input
                  className="inputClub"
                  id="inputClub"
                  type="text"
                  placeholder="Catégorie (Obligatoire)"
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

            <div className="page">
              <div className="inputT" id="inp2">
                <div className="label">Localisation</div>
                <select className="selectG" id="desc">
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
                />
                <input
                  className="inputClub"
                  id="inputClub"
                  placeholder="Adresse e-mail (Obligatoire)"
                  type="text"
                />
                <input
                  className="inputClub"
                  id="inputClub"
                  placeholder="Site web (Optionél)"
                  type="text"
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
