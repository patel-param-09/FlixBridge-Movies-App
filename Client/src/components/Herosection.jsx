import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addWatchLater } from "../features/watchLaterSlice";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

function Herosection({ title, src, rating, url, name, data }) {
  const [status, setStatus] = useState(true);
  const dispatch = useDispatch();

  function handleClick() {
    const movie = dispatch(addWatchLater(data));
    toast("Movie Added Sucessfully");
  }

  return (
    <>
      <ToastContainer />
      <div className="main-container">
        <div className="Card">
          <Link
            to={`/${title.split(" ").join("-").toLowerCase()}`}
            className="Click"
            state={{ rating, url, name }}
          >
            <img src={src} alt="" />
          </Link>
          <div className="bottom-icon">
            <h3 className="movie-name">{title}</h3>

            {status ? (
              <button className="plus-button" onClick={handleClick}>
                +
              </button>
            ) : (
              <FontAwesomeIcon icon={faCheck} className="plus-button" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Herosection;
