import "./ModelFollowing.css";

import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";

import { MdClose } from "react-icons/md";
import ListClubUser from "./ListClubUser";
// import FormUpdateProfile from "./formUpdateProfile";

const ModelUserClubs = ({ showModelUserClubs, setShowModelUserClubs }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModelUserClubs ? 1 : 0,
    transform: showModelUserClubs ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModelUserClubs = (e) => {
    if (modalRef.current === e.target) {
      setShowModelUserClubs(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModelUserClubs) {
        setShowModelUserClubs(false);
        console.log("I pressed");
      }
    },
    [setShowModelUserClubs, showModelUserClubs]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModelUserClubs ? (
        <div
          className="BackgroundFollowing"
          onClick={closeModelUserClubs}
          ref={modalRef}
        >
          <animated.div style={animation}>
            <div className=" ModalWrapperFollowing">
              <div className="ModalContentFollowing">
                <ListClubUser />
              </div>
              <div
                className="CloseModalButtonFollowing"
                aria-label="Close modal"
                onClick={() => setShowModelUserClubs((prev) => !prev)}
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
export default ModelUserClubs;
