import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
  buttonStyle: {
    borderRadius: "2rem",
    width: "6rem",
    height: "2rem",
    outline: "none"
  }
};

export const Button = ({ label }, props) => {
  const { buttonStyle } = styles;
  return (
    <div>
      <button style={buttonStyle}>{label}</button>
    </div>
  );
};

Button.propTypes = {
  // name: PropTypes.string
};
