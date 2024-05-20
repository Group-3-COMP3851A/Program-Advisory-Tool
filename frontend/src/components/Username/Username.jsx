/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./style.css";

export const Username = ({ property1, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`username ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className="overlap-group">
        <div className="rectangle" />
        <div className="div">
          {state.property1 === "default" && <>Username</>}

          {state.property1 === "variant-2" && <>Student</>}
        </div>
      </div>
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "click":
      return {
        ...state,
        property1: "variant-2",
      };
  }

  return state;
}

Username.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
};
