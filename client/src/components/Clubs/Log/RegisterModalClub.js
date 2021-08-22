import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";

import { MdClose } from "react-icons/md";
import "./RegisterModalClub.css";
import formRegisterModelClub from "./formRegisterModelClub";
import FormRegisterModelClub from "./formRegisterModelClub";

const ReginterModalClub = ({
  showReginterModalClub,
  setShowReginterModalClub,
}) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showReginterModalClub ? 1 : 0,
    transform: showReginterModalClub ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeReginterModalClub = (e) => {
    if (modalRef.current === e.target) {
      setShowReginterModalClub(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showReginterModalClub) {
        setShowReginterModalClub(false);
        console.log("I pressed");
      }
    },
    [setShowReginterModalClub, showReginterModalClub]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showReginterModalClub ? (
        <div
          className="BackgroundCbs"
          onClick={closeReginterModalClub}
          ref={modalRef}
        >
          <animated.div style={animation}>
            <div className=" ModalWrapperCbs">
              <div className="ModalContentCbs">
                <FormRegisterModelClub />
              </div>
              <div
                className="CloseModalButtonCbs"
                aria-label="Close modal"
                onClick={() => setShowReginterModalClub((prev) => !prev)}
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
export default ReginterModalClub;
