/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./style.css";

export const Password = ({ property1, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`password ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className="overlap-group-2">
        <div className="rectangle-2" />
        <div className="div-2">
          {state.property1 === "default" && <>Password</>}

          {state.property1 === "variant-3" && <>Jake</>}
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
        property1: "variant-3",
      };
  }

  return state;
}

Password.propTypes = {
  property1: PropTypes.oneOf(["variant-3", "default"]),
};
