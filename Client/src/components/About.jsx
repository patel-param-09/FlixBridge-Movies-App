import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function About() {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const name = path.split("-").join(" ");
  console.log(name);

  const navigate = useNavigate();
  return (
    <div>
      <button
        className="back-btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
        Back
      </button>
      <div className="div">
        <Link to={location.state.url} target="_blank">
          <img
            src={`http://localhost:3000/images/${name}.jpeg`}
            alt={name}
            className="img"
          />
        </Link>
        <div className="content-div">
          <h1 className="name">Name :- {location.state.name}</h1>
          <h2 className="rating">Rating :- {location.state.rating}</h2>
          <div className="link-div">
            <span>Click This Below Button for more Details ....</span>
            <Link to={location.state.url} target="_blank">
              <button className="button">Open IMDb Page</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
