import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Herosection({
  title,
  src,
  rating,
  url,
  name,
  data,
  id,
  isWatchLater,
}) {
  const [status, setStatus] = useState(true);

  function handleClick() {
    axios.post(`http://localhost:3000/add-to-watch-later/${id}`).then((res) => {
      console.log(res);
    });
    toast("Movie Added Sucessfully");
    setStatus(false);
    console.log(status);
  }

  useEffect(() => {
    setStatus(!isWatchLater);
  }, []);

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
