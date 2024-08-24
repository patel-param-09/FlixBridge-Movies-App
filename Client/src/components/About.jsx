import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../App.css";

function About() {
  const location = useLocation();
  console.log(location);
  return (
    <div className="div">
      <h1 className="name">Name :- {location.state.name}</h1>
      <h2 className="rating">Rating :- {location.state.rating}</h2>
      <div className="link-div">
        <span>Click This Below Button for more Details ....</span>
        <Link to={location.state.url} target="_blank">
          <button className="button">Open IMDb Page</button>
        </Link>
      </div>
    </div>
  );
}

export default About;
