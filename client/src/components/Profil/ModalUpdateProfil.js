import "./ModalUpdateProfil.css";

import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";

import { MdClose } from "react-icons/md";
import FormUpdateProfile from "./formUpdateProfile";

const ModalUpdateProfil = ({
  showModalUpdateProfil,
  setShowModalUpdateProfil,
}) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModalUpdateProfil ? 1 : 0,
    transform: showModalUpdateProfil ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModalUpdateProfil = (e) => {
    if (modalRef.current === e.target) {
      setShowModalUpdateProfil(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModalUpdateProfil) {
        setShowModalUpdateProfil(false);
        console.log("I pressed");
      }
    },
    [setShowModalUpdateProfil, showModalUpdateProfil]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModalUpdateProfil ? (
        <div
          className="BackgroundUpPf"
          onClick={closeModalUpdateProfil}
          ref={modalRef}
        >
          <animated.div style={animation}>
            <div className=" ModalWrapperUpPf">
              <div className="ModalContentUpPf">
                <FormUpdateProfile />
              </div>
              <div
                className="CloseModalButtonUpPf"
                aria-label="Close modal"
                onClick={() => setShowModalUpdateProfil((prev) => !prev)}
              >
                <MdClose />
              </div>
            </div>
          </animated.div>
        </div>
      ) : null}
    </>
  );
};
export default ModalUpdateProfil;
