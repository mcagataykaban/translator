import React from "react";
import "./styles/Drawer.scss";
const Drawer = (props) => {
  //   const isVisible = props.isVisible;
  const { isVisible, setIsVisible, title } = props;
  console.log("isvisible", isVisible);
  return (
    <>
      <div className={`Drawer ${isVisible ? "visible" : ""}`}>
        <div className="close-area">
          <div>{title}</div>
          <div onClick={() => setIsVisible(false)} className="close-button">
            ❌
          </div>
        </div>
        <div className="content-area">{props.children}</div>
      </div>
      <div
        onClick={() => setIsVisible(false)}
        className={`Backdrop ${isVisible ? "backdrop-visible" : ""}`}
      ></div>
    </>
  );
};

export default Drawer;
