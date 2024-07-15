import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Heading from "./components/heading";
import Herosection from "./components/Herosection";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [data, setData] = useState([]);
  const [cuurPage, setCurrPage] = useState(1);
  const cardPerPage = 5;
  const lastIndex = cuurPage * cardPerPage;
  const firstIndex = lastIndex - cardPerPage;
  const totalCards = data.slice(firstIndex, lastIndex);
  const noOfPages = Math.ceil(data.length / cardPerPage);
  const pageNumbers = [...Array(noOfPages + 1).keys()].slice(1);

  useEffect(() => {
    axios.get("http://localhost:3000/api").then((res) => setData(res.data));
  }, []);
  const allData = totalCards.map((ele) => {
    return <Herosection title={ele.movie} src={ele.image} />;
  });

  function handleCurrPage(id) {
    setCurrPage(id);
  }
  return (
    <>
      <Heading />
      <div className="outer-div">{allData}</div>
      <nav className="navbar">
        <ul className="pagination pagination-lg">
          {pageNumbers.map((num, i) => {
            return (
              <li
                key={i}
                className={`page-item ${cuurPage === num ? "active" : ""}`}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => handleCurrPage(num)}
                >
                  {num}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default App;
