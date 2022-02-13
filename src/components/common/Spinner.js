import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "./Spinner.css";

const Spinner = ({ delay }) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (delay === 0) {
      setShowSpinner(true);
      return () => {};
    }

    const timer = setTimeout(() => setShowSpinner(true), delay);
    return () => clearTimeout(timer);
  });

  return showSpinner && <div className="loader">Loading...</div>;
};

Spinner.propTypes = {
  delay: PropTypes.number
};

Spinner.defaultProps = {
  delay: 0
};

export default Spinner;
