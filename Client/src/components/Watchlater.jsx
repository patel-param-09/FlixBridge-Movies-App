import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fetchClient from "../Services/Instance";
import { jwtDecode } from "jwt-decode";

function Watchlater() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const axiosInstance = fetchClient();
  useEffect(() => {
    allData();
  }, []);

  function allData() {
    const token = localStorage.getItem("token");
    if (token != null) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      axiosInstance.get(`show-watch-later/${userId}`).then((res) => {
        setMovies(res.data);
      });
    } else {
      navigate("/login");
    }
  }

  function removeWatchLater(id) {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    axiosInstance
      .delete(`/remove-from-watchLater/${id}/${userId}`)
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
            onClick={() => removeWatchLater(movie.movieId)}
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
