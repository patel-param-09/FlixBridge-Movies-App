import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeWatchLater } from "../features/watchLaterSlice";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Watchlater() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => {
    return state.name;
  });
  const card = movies.map((movie, id) => {
    return (
      <div className="Card" key={id}>
        <Link
          to={`/${movie.movie.split(" ").join("-").toLowerCase()}`}
          className="Click"
          state={{
            name: movie.movie,
            rating: movie.rating,
            url: movie.imdb_url,
          }}
        >
          <img src={movie.image} alt="" />
        </Link>
        <div className="bottom-icon">
          <h3 className="movie-name">{movie.movie}</h3>
          <button
            className="delete-button"
            onClick={() => dispatch(removeWatchLater(id))}
          >
            X
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="Watch-later-div">
        <Link to={"/"} className="link">
          <button className="back-button">
            <FontAwesomeIcon icon={faBackward} className="left Arrow" />
            Back
          </button>
        </Link>
        <h1>All Watch-Later Movies</h1>
      </div>
      <div className="main-container">{card}</div>
    </div>
  );
}

export default Watchlater;
