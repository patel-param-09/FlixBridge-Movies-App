import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import fetchClient from "../Services/Instance";
import { jwtDecode } from "jwt-decode";

function Herosection({ title, src, rating, url, name, id, isWatchLater }) {
  const [status, setStatus] = useState(true);

  const axiosInstance = fetchClient();
  function handleClick() {
    const token = localStorage.getItem("token");
    if (token != null) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      axiosInstance
        .post(`add-to-watch-later/${id}/${userId}`)
        .then((res) => {});
      toast.success("Movie Added Sucessfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setStatus(isWatchLater);
    }
  }

  useEffect(() => {
    setStatus(!isWatchLater);
  }, [isWatchLater]);

  return (
    <>
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
