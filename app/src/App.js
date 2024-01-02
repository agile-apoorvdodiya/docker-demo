import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [version, setVersion] = useState("defaut");
  const [list, setList] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => {
        res.json().then((version) => {
          setVersion(version.data);
        });
      })
      .catch((err) => {
        console.error("api err >> ", err);
      });
    fetch("http://localhost:3001/list-files")
      .then((res) => {
        res.json().then((list) => {
          setList(list);
        });
      })
      .catch((err) => {
        console.error("api err >> ", err);
      });
  }, []);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const handleUpload = async () => {
    if (!file) {
      console.error("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      }).catch((err) => {
        console.error("file upload error >> ", err);
      });

      if (response.ok) {
        console.info("File uploaded successfully!");
        // You can handle the success response here
      } else {
        console.error("File upload failed.");
        // You can handle the error response here
      }
    } catch (error) {
      console.error("An error occurred during file upload:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Version: {version}</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload File</button>
        </p>
        <p>files: {list && JSON.stringify(list, null, 2)}</p>
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
