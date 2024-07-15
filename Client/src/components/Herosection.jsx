import React from "react";

function Herosection({ title, src }) {
  return (
    <div className="main-container">
      <div className="Card">
        <img src={src} alt="" />
        <div className="bottom-icon">
          <h3 className="movie-name">{title}</h3>
          <button className="plus-button">+</button>
        </div>
      </div>
    </div>
  );
}

export default Herosection;
