import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import "../App.css";

function About() {
  const params = useParams();
  const location = useLocation();
  return (
    <div className="div">
      <h1 className="name">Name :- {params.movie}</h1>
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
