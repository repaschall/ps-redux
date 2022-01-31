import React from "react";
import { Link } from "react-router-dom";

// #e9ecef

const HomePage = () => (
  <div className="mt-4 p-5 bg-light rounded">
    <h1>Pluralsight Administration</h1>
    <p>React, Redux and React Router for ultra-responsive web apps.</p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn more
    </Link>
  </div>
);

export default HomePage;
