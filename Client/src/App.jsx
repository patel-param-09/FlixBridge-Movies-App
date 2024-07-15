import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Heading from "./components/heading";
import Herosection from "./components/Herosection";

function App() {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    axios.get("http://localhost:3000/api").then((res) => setData(res.data));
  }, []);
  const allData = data.map((ele) => {
    return <Herosection title={ele.movie} src={ele.image} />;
  });
  return (
    <>
      <Heading />
      <div className="outer-div">{allData}</div>
    </>
  );
}

export default App;
