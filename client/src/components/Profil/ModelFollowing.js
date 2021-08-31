import "./ModelFollowing.css";

import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";

import { MdClose } from "react-icons/md";
// import FormUpdateProfile from "./formUpdateProfile";

const ModelFollowing = ({ showModelFollowing, setShowModelFollowing }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModelFollowing ? 1 : 0,
    transform: showModelFollowing ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModelFollowing = (e) => {
    if (modalRef.current === e.target) {
      setShowModelFollowing(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModelFollowing) {
        setShowModelFollowing(false);
        console.log("I pressed");
      }
    },
    [setShowModelFollowing, showModelFollowing]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModelFollowing ? (
        <div
          className="BackgroundFollowing"
          onClick={closeModelFollowing}
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
                onClick={() => setShowModelFollowing((prev) => !prev)}
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
export default ModelFollowing;
