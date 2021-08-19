import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";

import { MdClose } from "react-icons/md";
import "./loginModal.css";
import SignUpForm from "../formLog/formRegister";

export const SignUpModal = ({ showSignUpModal, setShowSignUpModal }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showSignUpModal ? 1 : 0,
    transform: showSignUpModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeSignUpModal = (e) => {
    if (modalRef.current === e.target) {
      setShowSignUpModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showSignUpModal) {
        setShowSignUpModal(false);
        console.log("I pressed");
      }
    },
    [setShowSignUpModal, showSignUpModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showSignUpModal ? (
        <div className="Background" onClick={closeSignUpModal} ref={modalRef}>
          <animated.div style={animation}>
            <div className=" ModalWrapper">
              <img className="ModalImg" src="img/img-2.svg" alt="login" />
              <div className="ModalContent">
                <SignUpForm />
              </div>
              <div
                className="CloseModalButton"
                aria-label="Close modal"
                onClick={() => setShowSignUpModal((prev) => !prev)}
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
