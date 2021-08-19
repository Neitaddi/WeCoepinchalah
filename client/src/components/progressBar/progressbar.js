import React, { useRef, useEffect, useCallback } from "react";
import { MdClose } from "react-icons/md";
import "./ProgressBar.css";
export const ProgressBar = ({ showProgressBar, setShowProgressBar }) => {
  const modalRef = useRef();

  const closeProgressBar = (e) => {
    if (modalRef.current === e.target) {
      setShowProgressBar(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showProgressBar) {
        setShowProgressBar(false);
        console.log("I pressed");
      }
    },
    [setShowProgressBar, showProgressBar]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showProgressBar ? (
        <div
          className="Background"
          onClick={closeProgressBar}
          ref={modalRef}
          showProgressBar={showProgressBar}
        >
          {/* <animated.div style={animation}> */}
          <div className="Progress">
            <h2>WeCoepi</h2>
            <h2>WeCoepi</h2>
          </div>
          <div
            className="CloseModalButton"
            aria-label="Close modal"
            onClick={() => setShowProgressBar((prev) => !prev)}
          >
            <MdClose />
          </div>

          {/* </animated.div> */}
        </div>
      ) : null}
    </>
  );
};
