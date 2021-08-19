import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";

import { MdClose } from "react-icons/md";
import "./loginModal.css";
import FormLogin from "../formLog/formLogin";

const LoginModal = ({ showLoginModal, setShowLoginModal }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showLoginModal ? 1 : 0,
    transform: showLoginModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeLoginModal = (e) => {
    if (modalRef.current === e.target) {
      setShowLoginModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showLoginModal) {
        setShowLoginModal(false);
        console.log("I pressed");
      }
    },
    [setShowLoginModal, showLoginModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showLoginModal ? (
        <div className="Background" onClick={closeLoginModal} ref={modalRef}>
          <animated.div style={animation}>
            <div className=" ModalWrapper">
              <img className="ModalImg" src="img/img-1.svg" alt="login" />
              <div className="ModalContent">
                <FormLogin />
              </div>
              <div
                className="CloseModalButton"
                aria-label="Close modal"
                onClick={() => setShowLoginModal((prev) => !prev)}
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
export default LoginModal;
