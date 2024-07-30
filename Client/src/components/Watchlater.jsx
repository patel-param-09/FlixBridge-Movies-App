import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function Watchlater() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    allData();
  }, []);

  function allData() {
    axios.get("http://localhost:3000/show-watch-later").then((res) => {
      setMovies(res.data);
    });
  }

  function removeWatchLater(id) {
    console.log(id);
    axios
      .patch(`http://localhost:3000/remove-from-watchLater/${id}`)
      .then((res) => {
        allData();
      });
  }
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
            onClick={() => removeWatchLater(movie.id)}
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
