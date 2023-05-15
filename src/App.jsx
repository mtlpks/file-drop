import { useState } from "react";
import "./App.css";

function App() {
  const [dragActive, setDragActive] = useState(false);
  const [filename, setFilename] = useState("");
  let lastTarget = null;

  function isFile(evt) {
    const data = evt.dataTransfer;
    for (let i = 0; i < data.types.length; i++) {
      if (data.types[i] === "Files") {
        return true;
      }
    }
    return false;
  }
  const handleDragEnter = (e) => {
    if (isFile(e)) {
      lastTarget = e.target;
      setDragActive(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (e.target === document || e.target === lastTarget) {
      setDragActive(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length == 1) {
      e.preventDefault();
      setFilename(e.dataTransfer.files[0].name);
    }
  };

  const overrideDefaults = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="app"
      onDragEnter={handleDragEnter}
      onDragOver={handleDrag}
      onDragLeave={handleDragLeave}
      onDrop={overrideDefaults}
    >
      <div className="wrapper">
        <div
          className="dropzone"
          onDrop={handleDrop}
          id={dragActive ? "dropzoneDrag" : "dropzoneNotDrag"}
        >
          <div className="dropInfo">omg hi!!!!</div>
        </div>
        <p>Drag and drop anything here!</p>
        <button className="btn-primary">Press here</button>
        <p className="title">{filename ? `Filename: ${filename}` : ""}</p>
      </div>
    </div>
  );
}

export default App;
