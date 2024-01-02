import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [version, setVersion] = useState("defaut");

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => {
        res.json().then((version) => {
          setVersion(version.data);
        });
      })
      .catch((err) => {
        console.log("api err >> ", err);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Version: {version}</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
