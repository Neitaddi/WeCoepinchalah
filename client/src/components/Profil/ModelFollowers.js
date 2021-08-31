import "./ModelFollowing";

import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";

import { MdClose } from "react-icons/md";
// import FormUpdateProfile from "./formUpdateProfile";

const ModelFollowers = ({ showModelFollowers, setShowModelFollowers }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModelFollowers ? 1 : 0,
    transform: showModelFollowers ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModelFollowers = (e) => {
    if (modalRef.current === e.target) {
      setShowModelFollowers(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModelFollowers) {
        setShowModelFollowers(false);
        console.log("I pressed");
      }
    },
    [setShowModelFollowers, showModelFollowers]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModelFollowers ? (
        <div
          className="BackgroundFollowing"
          onClick={closeModelFollowers}
          ref={modalRef}
        >
          <animated.div style={animation}>
            <div className=" ModalWrapperFollowing">
              <div className="ModalContentFollowing">
                {/* <FormUpdateProfile /> */}
              </div>
              <div
                className="CloseModalButtonFollowing"
                aria-label="Close modal"
                onClick={() => setShowModelFollowers((prev) => !prev)}
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
export default ModelFollowers;
