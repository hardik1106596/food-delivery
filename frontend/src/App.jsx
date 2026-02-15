import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import React from "react";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        < Route path="/" element={<h1>Home</h1>} />
      </Routes>
    </div>
  );
}

export default App;
